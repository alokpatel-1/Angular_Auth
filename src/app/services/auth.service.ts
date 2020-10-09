import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private basicUrl = `http://localhost:3000/`;
  constructor(private http: HttpClient) {}

  signupRequest(userdetails: any): any {
    return this.http.post(`${this.basicUrl}signup`, { userdetails });
  }

  loginRequest(userCredentials: any): any {
    return this.http.post(`${this.basicUrl}login`, { userCredentials });
  }
}
