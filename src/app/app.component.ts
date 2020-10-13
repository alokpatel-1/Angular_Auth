import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Auth';
  loading: boolean;
  constructor(private store: Store<{ user: object }>) {
    this.store.select('user').subscribe((res) => {
      this.loading = res['loading'];
    });
  }
}
