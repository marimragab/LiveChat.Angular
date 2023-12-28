import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  userImageUrl = '../assets/images/user.avif';
  user: any;
  userName: string;

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    this.user = this.authService.decodeToken(token);
    this.userName =
      this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    console.log(this.user);
    console.log(
      this.user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    );
  }

  ChatWithAdmin() {
    this.router.navigate(['/chat', 'admin']);
  }
}
