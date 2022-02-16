import {
  ConflictException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { JoinChatDto } from './dto/join-chat.dto';
import { ChatRoom } from './interfaces/chat-room.interface';
import { ChatMessage } from './interfaces/chat-message.interface';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel('Chat') private chatModel: Model<ChatDocument>,
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
  ) {}

  async createChatRoom(createChatdto: CreateChatDto) {
    try {
      const { name, user } = createChatdto;
      const chat = new this.chatModel({ name: name, user: { name: user } });
      return chat.save();
    } catch (err) {
      console.log(err);
      throw new ConflictException('문제 발생');
    }
  }

  async getMyChatList(username: string): Promise<ChatRoom[]> {
    const chatRoom = await this.chatModel.find({ 'user.name': username }, [
      'name',
      'createdAt',
    ]);
    return chatRoom;
  }

  async getMyChatRoom(name: string) {
    return;
  }

  async joinChatRoom(joinChatDto: JoinChatDto) {
    const { chat_id, user } = joinChatDto;
    try {
      await this.chatModel
        .findByIdAndUpdate(chat_id, { $push: { name: user } })
        .exec();
    } catch (err) {
      console.log(err);
      throw new ConflictException('문제 발생');
    }
  }

  async createMessage(createMessageDto: CreateMessageDto) {
    try {
      const Message = new this.messageModel(createMessageDto);
      return Message.save();
    } catch (err) {
      console.log(err);
      throw new ConflictException('문제 발생');
    }
  }

  async findRoom(
    room: string,
    limit: number,
    page: number,
  ): Promise<ChatRoom[]> {
    const roomList = await this.chatModel
      .find({ name: { $regex: '.*' + room + '.*' } }, ['name', 'createdAt'])
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * (page - 1));
    return roomList;
  }

  async findUserInRoom(room: string, user: string): Promise<boolean> {
    const data = await this.chatModel.findOne({ _id: room, 'user.name': user });
    if (data) return true;
    return false;
  }

  async findRoomMessage(room: string): Promise<ChatMessage[]> {
    if (room.match(/^[0-9a-fA-F]{24}$/)) {
      const data = await this.messageModel
        .find({ _id: room }, ['_id', 'sender', 'message', 'createdAt'])
        .sort({ createdAt: -1 });
      return data;
    }
    throw new BadRequestException('잘못된 요청입니다.');
  }
}
