import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  SignupSuccess,
  SignupFailure,
  UserActionType,
  LoginSuccess,
  LoginFail,
  LogoutSuccess,
  ProfileReqSuccess,
  ProfileReqFail,
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
    delay(4000),
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
    delay(4000),
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
    tap((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('token', this.user.payload.token);
        this.router.navigate(['/landing']);
      }
    })
  );

  @Effect()
  logoutRequest = this.action$.pipe(
    ofType(UserActionType.logoutRequest),
    mergeMap(async () => new LogoutSuccess()),
    catchError(() => EMPTY)
  );

  @Effect({ dispatch: false })
  logoutsuccess = this.action$.pipe(
    ofType(UserActionType.logoutSuccess),
    tap(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    })
  );

  // userProfile Effect

  @Effect()
  profileReq = this.action$.pipe(
    ofType(UserActionType.profileRequest),
    map((action) => action['payload']),
    delay(4000),
    mergeMap((payload) =>
      this.autheService.getProfile(payload).pipe(
        map((response) => new ProfileReqSuccess(response)),
        catchError(async (error) => new ProfileReqFail({ error: error.error }))
      )
    )
  );

  @Effect({ dispatch: false })
  profileFail = this.action$.pipe(
    ofType(UserActionType.profileReqFail),
    tap(() => {
      this.router.navigate(['/login']);
    })
  );
}
