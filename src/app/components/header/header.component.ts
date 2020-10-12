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
  constructor(private store: Store<{ user: object }>) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((res) => {
      if (res['user'] !== null) {
        this.userName$ = res['user']['userName'];
        this.userId = res['user']['userId'];
      }
    });
  }

  UserLogout() {
    this.store.dispatch(new LogoutRequest());
    console.log('logout');
  }

  Profile() {
    this.store.dispatch(new ProfileRequest(this.userId));
  }
}
