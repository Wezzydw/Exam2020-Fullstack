import {AuthUser} from './authUser';

export class LoginEmail {
  static readonly type = '[Auth] LoginEmail';

  constructor(public email: string, public password: string) {}
}

export class GetUser {
  static readonly type = '[Auth] GetUser';

  constructor(public uid: string) {}
}

export class LogOut {
  static readonly type = '[Auth] LogOut';

  constructor() {}
  
export class RegisterUser {
  static readonly type = '[Auth] RegisterUser';

  constructor(public name: string, public email: string, public userName: string, public password: string) {}
}
