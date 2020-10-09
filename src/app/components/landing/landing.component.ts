import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  userName$: string;
  constructor(private store: Store<{ user: object }>) {
    //   this.store.select('user').subscribe((res) => {
    //     console.log('landing', res);
    //   });
  }

  ngOnInit(): void {
    this.store.select('user').subscribe((res) => {
      if (res['user'] !== null) {
        this.userName$ =
          res['user']['firstName'] + ' ' + res['user']['lastName'];
      }
    });
  }
}
