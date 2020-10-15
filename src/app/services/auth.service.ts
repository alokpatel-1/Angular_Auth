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

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  landing() {
    return this.http.get(`${this.basicUrl}landing`);
  }

  getProfile(userId) {
    return this.http.get(`${this.basicUrl}profile`, { params: { userId } });
  }

  getDatafromJson(params) {
    return this.http.get(`http://localhost:2000/${params}`);
  }
  // getDatafrom() {
  //   return this.http.get(`${this.basicUrl}loaddummydata`);
  // }

  filterData(filterparams) {
    return this.http.post(`${this.basicUrl}filterdata`, { filterparams });
  }

  handlesearch(searchKey) {
    return this.http.get(`${this.basicUrl}search`, { params: { searchKey } });
  }
}
