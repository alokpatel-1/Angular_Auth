import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signupRequest(userdetails: any): any {
    return this.http.post(`${environment.nodeServerUrl}signup`, {
      userdetails,
    });
  }

  loginRequest(userCredentials: any): any {
    return this.http.post(`${environment.nodeServerUrl}login`, {
      userCredentials,
    });
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  landing() {
    return this.http.get(`${environment.nodeServerUrl}landing`);
  }

  getProfile(userId) {
    return this.http.get(`${environment.nodeServerUrl}profile`, {
      params: { userId },
    });
  }

  getDatafromJson(params) {
    return this.http.get(`http://localhost:2000/${params}`);
  }
  // getDatafrom() {
  //   return this.http.get(`${environment.nodeServerUrl}loaddummydata`);
  // }

  filterData(filterparams) {
    return this.http.post(`${environment.nodeServerUrl}filterdata`, {
      filterparams,
    });
  }

  handlesearch(searchKey) {
    return this.http.get(`${environment.nodeServerUrl}search`, {
      params: { searchKey },
    });
  }
}
