import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName$: string;
  constructor(private store: Store<{ user: object }>) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((res) => {
      if (res['user'] !== null) {
        this.userName$ = res['user']['userName'];
      }
    });
  }
}
