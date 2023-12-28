import { Injectable } from '@angular/core';
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
  startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:44331/chat', { withCredentials: true })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.connectionEstablished.next(true);
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

  sendMessage(receiverId: string, message: string): void {
    if (this.hubConnection) {
      this.hubConnection
        .invoke('SendMessage', receiverId, message)
        .catch((err) => console.error(err));
    }
  }

  getConnectionEstablished(): BehaviorSubject<boolean> {
    return this.connectionEstablished;
  }
}
