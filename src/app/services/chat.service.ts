import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = 'https://localhost:7055/chat';
  public connection: HubConnection = new signalR.HubConnectionBuilder()
    .withUrl(this.baseUrl)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  public messages$ = new BehaviorSubject<any>([]);
  public connectedUsers$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: string[] = [];

  constructor() {
    this.startConnection();
    this.connection.on(
      'ReceiveMessage',
      (sender: Number, message: string, messageDate: string) => {
        console.log(
          `Sender:${sender} || Message:${message} || Date:${messageDate}`
        );
      }
    );

    this.connection.on('OnlineUsers', (users: any) => {
      console.log(`ConnectedUsers: ${users}`);
    });
  }

  //start connection
  public async startConnection() {
    try {
      await this.connection.start();
      console.log('Connection started');
    } catch (error) {
      console.log(error);
    }
  }

  //send message
  public async sendMessage(
    content: string,
    senderId: number,
    receiverId: number
  ) {
    return this.connection
      .invoke('SendMessage', content, senderId, receiverId)
      .catch((err) => console.error(err));
  }

  //get online users
  public async onlineUsers() {
    return this.connection.invoke('GetOnlineUsers');
  }
}
