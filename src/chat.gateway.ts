// import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

// @WebSocketGateway()
// export class ChatGateway {
//   @SubscribeMessage('message')
//   handleMessage(client: any, payload: any): string {
//     return 'Welcome!';
//   }
// }
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'net';

@WebSocketGateway(8100, { namespace: 'chat', cors: true })
export class ChatGateway {
  @WebSocketServer() server: Server;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public users: number = 0;

  @SubscribeMessage('entrance')
  connectSomeone(
    @MessageBody() data: string[],
    @ConnectedSocket() client: Socket,
  ) {
    const [nickname, room]: string[] = data;
    console.log(`${nickname}님이 코드: ${room}방에 접속했습니다.`);
    const userData = `${nickname}님이 입장했습니다.`;
    this.users++;
    this.server.emit(`entrance(${room})`, userData, this.users);
  }

  @SubscribeMessage('send')
  sendMessage(@MessageBody() data: string, @ConnectedSocket() client) {
    const [room, nickname, message] = data;
    console.log(`${client.id} : ${data}`);
    client.broadcast.emit(room, [nickname, message]);
  }
}
