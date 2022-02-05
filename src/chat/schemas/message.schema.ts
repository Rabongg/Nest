import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Chat } from './chat.schema';

export type MessageDocument = Message & mongoose.Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  sender: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true })
  chat: Chat;

  @Prop({ required: true })
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
