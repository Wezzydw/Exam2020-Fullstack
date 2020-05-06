import {AuthUser} from './authUser';

export class LoginEmail {
  static readonly type = '[Auth] LoginEmail';

  constructor(public email: string, public password: string) {}
}

export class GetUser {
  static readonly type = '[Auth] GetUser';

  constructor(public uid: string) {}
}
export class UpdateUser {
  static readonly type = '[Auth] Update';
  constructor(public payload: AuthUser) {
  }
}
