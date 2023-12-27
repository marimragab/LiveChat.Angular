import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @Input() userId: string; // User ID for the chat window

  messages: string[] = [];
  newMessage: string = '';
  senderImage: string = '../../../assets/images/user.avif';
  senderName: string = 'Mariam';
  receiverImage: string = '../../../assets/images/user.avif';
  receiverName: string = 'Heba';
  hasPreviousMessages: boolean;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.hasPreviousMessages = this.messages.length > 0;

    // Initialize the chat and load initial messages
    // this.chatService.initChat(this.userId);
    // this.loadMessages();
    // Subscribe to incoming messages
    // this.chatService.messageReceived.subscribe((message: string) => {
    //   this.messages.push(message);
    // });
  }

  loadMessages() {
    // Logic to load messages from the service
    //this.messages = this.chatService.getMessages(this.userId);
  }

  sendMessage() {
    // Logic to send a message through the service
    // this.chatService.sendMessage(this.userId, this.newMessage);
    //this.newMessage = ''; // Clear the input after sending
  }
}
