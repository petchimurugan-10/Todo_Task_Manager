import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TasksGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('taskUpdate')
  handleTaskUpdate(@MessageBody() data: any) {
    this.server.emit('taskUpdate', data);
  }
}