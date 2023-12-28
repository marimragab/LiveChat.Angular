import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginModel: Login = { username: '', password: '' };
  decodedToken: any;
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.loginModel).subscribe(
      (response) => {
        console.log('Login successful:', response);
        if (response.token) {
          localStorage.setItem('token', response.token);

          this.decodedToken = this.authService.decodeToken(response.token);
          console.log('Decoded Token:', this.decodedToken);
        }

        const isAdmin =
          this.decodedToken[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ].includes('Admin');
        if (isAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
}
