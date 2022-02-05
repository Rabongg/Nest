import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel('Chat') private chatModel: Model<ChatDocument>,
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
  ) {}

  async createChatRoom(createChatdto: CreateChatDto) {
    try {
      const chat = new this.chatModel(createChatdto);
      return chat.save();
    } catch (err) {
      console.log(err);
      throw new ConflictException('문제 발생');
    }
  }

  async getChatRoom(name: string) {
    return;
  }

  async joinChatRoom(userName: string) {
    return;
  }
}
