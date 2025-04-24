import amqp from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import { IMessageBrokerAccess } from '../imessager-broker-access.interface';

export class RabbitMQ implements IMessageBrokerAccess {
  private connection!: amqp.Connection;
  private channel!: amqp.Channel;

  async init(): Promise<void> {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
  }

  async sendToQueue(queue: string, message: string | Buffer): Promise<void> {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, typeof message === 'string' ? Buffer.from(message) : message);
  }  

  async sendRPC({
    queue,
    message,
  }: {
    queue: string;
    message: any; // <- aceita qualquer tipo (não mudar na interface se não quiser)
  }): Promise<any> {
    const correlationId = uuidv4();
    const replyQueue = await this.channel.assertQueue('', { exclusive: true });
  
    return new Promise((resolve) => {
      this.channel.consume(
        replyQueue.queue,
        (msg) => {
          if (msg?.properties.correlationId === correlationId) {
            const content = msg.content.toString();
            resolve(JSON.parse(content));
          }
        },
        { noAck: true }
      );
  
      // Aqui forçamos a conversão segura para Buffer
      const bufferMessage = Buffer.isBuffer(message)
        ? message
        : Buffer.from(JSON.stringify(message));
  
      this.channel.sendToQueue(queue, bufferMessage, {
        replyTo: replyQueue.queue,
        correlationId,
      });
    });
  }
  
    
  async consume(queue: string, callback: (message: any) => void): Promise<void> {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        callback(msg);
        this.channel.ack(msg);
      }
    });
  }

  async close(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
  }
}
