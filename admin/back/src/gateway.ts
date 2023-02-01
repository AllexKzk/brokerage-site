import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";



@WebSocketGateway(4020)
export class ChatGateway {
    @WebSocketServer() server;

    @SubscribeMessage('addBroker')
    handleMessage(@MessageBody() message: string): void {
        this.server.emit('newBroker', true);
    }
    /*@SubscribeMessage('startTrade')
    emitTrade(@MessageBody() message: string): void {
        this.server.emit('tradeStarted', []);
    }*/
}