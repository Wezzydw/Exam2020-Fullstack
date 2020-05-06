import { State, Action, StateContext, Selector} from '@ngxs/store';
import {Userstats} from './userstats';
import {UserService} from './user.service';
import {tap} from 'rxjs/operators';
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

  /*@Action(UpdateUser)
   update({getState, setState}: StateContext<UserStateModel>, {payload}: UpdateUser) {
     this.userService.updateUser(payload);
     const state = getState();
     setState({
        ...state,
       //loggedInUser: payload
      });

   }*/
}
