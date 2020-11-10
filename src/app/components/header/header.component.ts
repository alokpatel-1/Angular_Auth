import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  LogoutRequest,
  ProfileRequest,
} from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName$: string;
  userId: any;
  isAuthenticated: boolean;
  // isLoggedIn = '';
  isLoggedIn = localStorage.getItem('token');

  constructor(private store: Store<{ user: object }>) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((res) => {
      if (res['user'] !== null) {
        this.userName$ = res['user']['userName'];
        this.userId = res['user']['userId'];
        this.isAuthenticated = res['isAuthenticated'];
      }
    });
  }

  UserLogout() {
    if (confirm('Press OK for logout')) {
      this.store.dispatch(new LogoutRequest());
    }
  }

  Profile() {
    this.store.dispatch(new ProfileRequest(this.userId));
  }
}
