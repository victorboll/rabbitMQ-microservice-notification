// Tipos de mensagem básica
export interface IMessagerAccess {
    queue: string;
    message: any;
}

export interface IMessagerAccessRequest {
    body: any;
    message: string;
}

export interface IResponseAccessResponse {
    code: number;
    response: any;
}

// Interface principal do Broker
export interface IMessagerBrokerAccess {
    connect(): Promise<any>;

    listenRPC(queue: string, callback: CallableFunction): void;

    createQueue(channel: any, queue: string): Promise<any>;

    sendPubSub(message: IMessagerAccess): Promise<any>;

    sendRPC(message: IMessagerAccess): Promise<IResponseAccessResponse>;

    messageConvert(message: any): IResponseAccessResponse;

    messageConvertRequest(message: any): IMessagerAccessRequest;

    responseCallRPC(objResponse: {
        queue: string;
        replyTo: string;
        correlationId: string;
        response: IResponseAccessResponse;
    }): Promise<void>;
}

// Interface para consumidores ("rotas de fila")
export interface IRouterMessageBroker {
    handle(messagerBrokerAccess: IMessagerBrokerAccess): void;
}