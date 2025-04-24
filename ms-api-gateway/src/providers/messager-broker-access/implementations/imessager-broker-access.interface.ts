export interface IMessageBrokerAccess {
    /**
     * Envia uma mensagem de forma assíncrona (fire and forget).
     */
    sendToQueue(queue: string, message: string | Buffer): Promise<void>;
  
    /**
     * Envia uma mensagem de forma síncrona (espera resposta).
     * @returns a resposta enviada pelo consumidor.
     */
    sendRPC(params: {
        queue: string;
        message: any; // <-- permite passar objetos diretamente, como no seu application
      }): Promise<any>;
      
    /**
     * Registra um consumidor para uma fila.
     */
    consume(queue: string, callback: (message: any) => void): Promise<void>;
  
    /**
     * Fecha a conexão com o broker.
     */
    close(): Promise<void>;
  }
  