import { State, Action, StateContext, Selector} from '@ngxs/store';
import {Userstats} from './userstats';
import {UpdateUser} from './user.actions';
import {UserService} from './user.service';
import {tap} from 'rxjs/operators';

export class UserStateModel {
  user: Userstats;
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
  @Action(UpdateUser)
  update({getState, setState}: StateContext<UserStateModel>, {payload}: UpdateUser) {
    const id = 1;
    return this.userService.updateUser(payload, id).pipe(tap((result) => {
    const state = getState();
    setState({
      ...state,
      user: result
    });
    }));
  }
}
