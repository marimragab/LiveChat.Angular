import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  userImageUrl = '../assets/images/user.avif';
  onlineUsers: any[] = [];
  sender: number;
  message: string;
  date: string;

  chatService = inject(ChatService);
  router = inject(Router);

  ngOnInit(): void {}
  sendMessage() {
    this.chatService
      .sendMessage('Hello from user', 1, 2)
      .then(() => {
        this.router.navigate(['chat']);
      })
      .catch((err) => console.log(err));
  }
  // Implement methods to open chat windows, etc.
}
