import { State, Selector} from '@ngxs/store';
import {UserService} from './user.service';
import {AuthUser} from '../../auth/shared/authUser';

export class UserStateModel {
  user: AuthUser;
}

@State<UserStateModel> ({
  name: 'user', defaults: {
    user: undefined
  }
})

export class UserState {

  constructor(private userService: UserService) {
  }
  @Selector()
  static getUser(state: UserStateModel) {
    return state.user;
  }
}
