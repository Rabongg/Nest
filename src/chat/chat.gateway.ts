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
import { cachedDataVersionTag } from 'v8';
import { ChatsService } from './chat.service';

@WebSocketGateway(8100, { namespace: 'chat', cors: true })
export class ChatGateway implements OnGatewayConnection {
  constructor(private readonly chatService: ChatsService) {}
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
  async connectSomeone(
    @MessageBody() data: string[],
    @ConnectedSocket() client: Socket,
  ) {
    const [nickname, room]: string[] = data;
    console.log(`${nickname}님이 코드: ${room}방에 접속했습니다.`);
    const userData = `${nickname}님이 입장했습니다.`;
    client.join(room);
    client.data.nickname = nickname;
    client.data.roomNumber = room;
    this.users[`${room}`]++;
    this.server.to(room).emit('enter', userData, this.users[`${room}`]);
  }

  @SubscribeMessage('create')
  async createChatRoom(
    @MessageBody() data: string[],
    @ConnectedSocket() client: Socket,
  ) {
    const [nickname, room]: string[] = data;
    const roomName = await this.chatService.createChatRoom({
      name: room,
      user: nickname,
    });
    const userData = `${room} 채팅방이 새로 생성되었습니다.`;
    this.users[`${roomName['id']}`] = 1;
    client.join(roomName['id']);
    client.data.nickname = nickname;
    client.data.roomNumber = roomName;
    this.server
      .to(`${roomName['id']}`)
      .emit('enter', userData, this.users[`${roomName['id']}`]);
  }

  @SubscribeMessage('send')
  sendMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    const [nickname, message] = data;
    const room = client.data.roomNumber;
    console.log(`${client.id} : ${data}`);
    this.chatService.createMessage({ chat: room, sender: nickname, message });
    client.broadcast.emit(room, [nickname, message]);
  }
}
