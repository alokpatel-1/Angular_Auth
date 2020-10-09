import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  SignupSuccess,
  SignupFailure,
  Signup,
  UserActionType,
  userActions,
} from '../actions/auth.actions';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffect {
  user: any;
  constructor(
    private action$: Actions,
    private autheService: AuthService,
    private router: Router
  ) {}

  @Effect()
  signupUser = this.action$.pipe(
    ofType(UserActionType.signup),
    map((action) => action['payload']),
    mergeMap((payload) =>
      this.autheService.signupRequest(payload).pipe(
        map((response) => new SignupSuccess(response)),
        catchError(async (error) => new SignupFailure({ error: error.error }))
      )
    )
  );

  @Effect({ dispatch: false })
  LogInSuccess = this.action$.pipe(
    ofType(UserActionType.signupSuccess),
    tap((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('token', this.user.payload.token);
        this.router.navigate(['/landing']);
      }
    })
  );
}
