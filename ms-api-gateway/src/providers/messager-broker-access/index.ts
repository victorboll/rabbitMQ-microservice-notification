import { RabbitMQ } from './implementations/rabbit-mq/rabbit-mq.provider';
import { IMessageBrokerAccess } from './implementations/imessager-broker-access.interface';

// Instância única que pode ser compartilhada
const rabbitMQ = new RabbitMQ();

export { rabbitMQ, RabbitMQ, IMessageBrokerAccess };