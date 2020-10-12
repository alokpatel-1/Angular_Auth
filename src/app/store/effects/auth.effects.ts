import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  SignupSuccess,
  SignupFailure,
  UserActionType,
  LoginSuccess,
  LoginFail,
  LogoutSuccess,
} from '../actions/auth.actions';
import { map, mergeMap, catchError, tap, delay } from 'rxjs/operators';
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
    delay(2000),
    mergeMap((payload) =>
      this.autheService.signupRequest(payload).pipe(
        map((response) => new SignupSuccess(response)),
        catchError(async (error) => new SignupFailure({ error: error.error }))
      )
    )
  );

  @Effect({ dispatch: false })
  signupSuccess = this.action$.pipe(
    ofType(UserActionType.signupSuccess),
    delay(2000),
    tap((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('token', this.user.payload.token);
        this.router.navigate(['/landing']);
      }
    })
  );

  @Effect()
  loginrequest = this.action$.pipe(
    ofType(UserActionType.loginRequest),
    map((action) => action['payload']),
    delay(2000),
    mergeMap((payload) =>
      this.autheService.loginRequest(payload).pipe(
        map((response) => new LoginSuccess(response)),
        catchError(async (error: any) => new LoginFail({ error: error.error }))
      )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess = this.action$.pipe(
    ofType(UserActionType.loginSuccess),
    delay(2000),
    tap((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('token', this.user.payload.token);
        this.router.navigate(['/landing']);
      }
    })
  );

  @Effect({ dispatch: false })
  loginError = this.action$.pipe(
    ofType(UserActionType.loginFailure),
    delay(2000),
    tap((error) => {})
  );

  @Effect()
  logoutRequest = this.action$.pipe(
    ofType(UserActionType.logoutRequest),
    mergeMap(async () => new LogoutSuccess()),
    catchError(() => EMPTY)
  );

  @Effect({ dispatch: false })
  logoursuccess = this.action$.pipe(
    ofType(UserActionType.logoutSuccess),
    tap(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    })
  );
}
