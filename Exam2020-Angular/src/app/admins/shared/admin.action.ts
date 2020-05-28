import {AuthUser} from '../../auth/shared/authUser';

export class SetSelectedUser {
  static readonly type = '[Admin] SetSelectedUser';

  constructor(public user: AuthUser) {}
}

