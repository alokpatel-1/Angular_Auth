import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

export enum UserActionType {
  signup = '[SIGNUP REQUEST] Signup request',
  signupSuccess = '[SIGNUP SUCCESS] Signup success',
  signupFailure = '[SIGNUP FAIL] Signup fail',

  loginRequest = '[LOGIN REQUEST] Login request',
  loginSuccess = '[LOGIN SUCCESS] Login success',
  loginFailure = '[LOGIN FAIL] Login fail',

  logoutRequest = '[LOGOUT REQUEST] Logout request',
  logoutSuccess = '[LOGOUT SUCCESS] Logout success',

  profileRequest = '[PROFILE REQUEST] profile request',
  profileReqSuccess = '[PROFILE SUCCESS] Profile success',
  profileReqFail = '[PROFILE FAIL] Profile fail',
}

export class ProfileRequest implements Action {
  readonly type = UserActionType.profileRequest;
  constructor(public payload: any) {
    console.log('profile action', payload);
  }
}
export class ProfileReqSuccess implements Action {
  readonly type = UserActionType.profileReqSuccess;
  constructor(public payload: any) {}
}
export class ProfileReqFail implements Action {
  readonly type = UserActionType.profileReqFail;
  constructor(public error: any) {}
}

export class Signup implements Action {
  readonly type = UserActionType.signup;
  constructor(public payload: any) {}
}

export class SignupSuccess implements Action {
  readonly type = UserActionType.signupSuccess;
  constructor(public payload: any) {}
}

export class SignupFailure implements Action {
  readonly type = UserActionType.signupFailure;
  constructor(public error: any) {}
}

export class LoginRequest implements Action {
  readonly type = UserActionType.loginRequest;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = UserActionType.loginSuccess;
  constructor(public payload: any) {}
}

export class LoginFail implements Action {
  readonly type = UserActionType.loginFailure;
  constructor(public error: any) {}
}

export class LogoutRequest implements Action {
  readonly type = UserActionType.logoutRequest;
  constructor() {}
}
export class LogoutSuccess implements Action {
  readonly type = UserActionType.logoutSuccess;
  constructor() {}
}

export type userActions =
  | Signup
  | SignupSuccess
  | SignupFailure
  | LoginRequest
  | LoginSuccess
  | LoginFail
  | LogoutRequest
  | LogoutSuccess
  | ProfileRequest
  | ProfileReqSuccess
  | ProfileReqFail;
