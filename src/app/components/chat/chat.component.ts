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
  receiverId = '4071a753-1e54-4e25-9164-c0025f994ce2';
  senderId;
  receiverImage = '../assets/images/admin-icon.webp';
  receiverName = 'Admin';
  chatMessages: { user: string; message: string }[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // console.log(localStorage.getItem('token'));
    // console.log(localStorage.getItem('userId'));
    this.senderId = localStorage.getItem('userId');
    this.chatService.startConnection(localStorage.getItem('token'));
    this.chatService.messages.subscribe((message) =>
      this.chatMessages.push(message)
    );
    console.log(this.chatMessages);

    this.chatService.getChatMessages().subscribe((message) => {
      // Handle the received message (e.g., display in the UI)
      console.log(
        `Received message from ${message.senderName}: ${message.message} : ${message.messageDate}`
      );
    });
    this.chatService
      .getConnectionEstablished()
      .subscribe((established: boolean) => {
        if (established) {
          this.chatService.joinChat(this.receiverId);
        }
      });

    // console.log(localStorage.getItem('token'));
  }

  sendMessage(): void {
    if (this.message.trim() !== '') {
      this.chatService.sendMessage(
        this.message,
        this.senderId,
        this.receiverId
      );
      this.message = '';
    }
  }
}
