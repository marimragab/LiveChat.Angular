import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection: HubConnection | undefined;
  messages: Subject<{ user: string; message: string }> = new Subject();
  private connectionEstablished = new BehaviorSubject<boolean>(false);
  private chatMessagesSubject = new Subject<{
    senderName: string;
    message: string;
    messageDate: string;
  }>();

  startConnection(authToken: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44331/chat', {
        withCredentials: true,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        console.log('Connection ID:', this.hubConnection?.connectionId);
        this.connectionEstablished.next(true);

        this.hubConnection.on(
          'ReceiveMessage',
          (senderName: string, receivedMessage: string, date: string) => {
            console.log(
              `Sender:${senderName} Message:${receivedMessage} Date:${date}`
            );
            this.chatMessagesSubject.next({
              senderName,
              message: receivedMessage,
              messageDate: date,
            });
          }
        );
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  joinChat(receiverId: string): void {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection
        .invoke('JoinChat', receiverId)
        .catch((err) => console.error(err));
    } else {
      console.error('SignalR connection is not in the Connected state.');
    }
  }

  sendMessage(message: string, senderId: string, receiverId: string): void {
    if (this.hubConnection) {
      this.hubConnection
        .invoke('SendMessage', message, senderId, receiverId)
        .catch((err) => console.error(err));
    }
  }

  getConnectionEstablished(): BehaviorSubject<boolean> {
    return this.connectionEstablished;
  }

  getChatMessages(): Subject<{
    senderName: string;
    message: string;
    messageDate: string;
  }> {
    return this.chatMessagesSubject;
  }
}
