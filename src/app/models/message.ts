export class Message {
  id?: number;
  content: string;
  senderId?: number;
  sender: string;
  receiverId?: number;
  isSender: boolean;
  date?: string;
  isRead?: boolean;
}
