import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth/';
  private jwtHelper = new JwtHelperService();
  decodedToken: any = null;

  constructor(private http: HttpClient) { }

  login(model: any) {
    console.log('model login: ', model);

    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((resp: any) => {
        const token = resp.token;
        localStorage.setItem('token', token);
        this.decodedToken = this.jwtHelper.decodeToken(token);
      })
    );
  }

  register(model: any) {
    console.log('model register: ', model);
    return this.http.post(this.baseUrl + 'register', model);
  }

  logout() {
    console.log('logged out.');
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
