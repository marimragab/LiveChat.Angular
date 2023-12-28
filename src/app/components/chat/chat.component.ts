import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  user = 'John';
  message = '';
  receiverId = '';
  receiverImage = '';
  receiverName = 'Admin';
  chatMessages: { user: string; message: string }[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.startConnection();
    this.chatService.messages.subscribe((message) =>
      this.chatMessages.push(message)
    );

    this.chatService
      .getConnectionEstablished()
      .subscribe((established: boolean) => {
        if (established) {
          this.chatService.joinChat('admin');
        }
      });
  }

  sendMessage(): void {
    if (this.message.trim() !== '') {
      this.chatService.sendMessage(this.receiverId, this.message);
      this.message = '';
    }
  }
}
