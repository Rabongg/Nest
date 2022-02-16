export interface ChatMessage {
  _id: string;
  sender: string;
  message: string;
  createdAt?: Date;
}
