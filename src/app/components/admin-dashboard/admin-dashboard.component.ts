import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  onlineUsers: any[] = [];
  adminImageUrl: string = '../assets/images/admin-icon.webp';
  adminName: string;
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.adminName = localStorage.getItem('adminName');
  }
}
