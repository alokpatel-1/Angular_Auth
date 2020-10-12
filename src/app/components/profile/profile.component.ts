import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileRequest } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private store: Store<{ user: object }>,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(new ProfileRequest('5f800818a5d69f3dfb875e17'));
    //   this.authService.landing().subscribe(
    //     (res) => {},
    //     (err) => {
    //       if (err instanceof HttpErrorResponse) {
    //         if (err.status === 500) {
    //           this.router.navigate(['/login']);
    //         }
    //       }
    //     }
    //   );
    // console.log('userid', this.userId$);
  }
}
