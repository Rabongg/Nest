import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8100, { namespace: 'chat', cors: true })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  public users = {};

  handleConnection(client: Socket, ...args: any[]) {
    console.log('socket connected');
  }

  handleDisconnect(client: Socket) {
    const room = client.data.roomNumber;
    const userData = `${client.data.nickname}님이 퇴장했습니다.`;
    console.log('socket disconnected');
    this.users[`${room}`]--;
    this.server.to(room).emit('exit', userData, this.users[`${room}`]);
  }

  @SubscribeMessage('entrance')
  connectSomeone(
    @MessageBody() data: string[],
    @ConnectedSocket() client: Socket,
  ) {
    const [nickname, room]: string[] = data;
    console.log(`${nickname}님이 코드: ${room}방에 접속했습니다.`);
    const userData = `${nickname}님이 입장했습니다.`;
    client.join(room);
    client.data.nickname = nickname;
    client.data.roomNumber = room;
    if (this.users[`${room}`]) this.users[`${room}`]++;
    else this.users[`${room}`] = 1;
    this.server.to(room).emit('enter', userData, this.users[`${room}`]);
  }

  @SubscribeMessage('send')
  sendMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    const [room, nickname, message] = data;
    console.log(`${client.id} : ${data}`);
    client.broadcast.emit(room, [nickname, message]);
  }
}
