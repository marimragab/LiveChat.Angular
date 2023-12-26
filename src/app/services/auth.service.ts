import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7055/api';

  constructor(private http: HttpClient) {}

  login(loginModel: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginModel);
  }
}
