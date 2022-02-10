import { SchemaFactory, Schema, Prop, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema({ timestamps: true })
export class Chat {
  @Prop({ required: true })
  name: string;

  @Prop(
    raw([
      {
        name: { type: String, required: true, unique: true },
      },
    ]),
  )
  user: Record<string, any>[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
