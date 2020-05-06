import {AuthUser} from './authUser';
import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AuthService} from './auth.service';
import {GetUser, LoginEmail, UpdateUser} from './auth.action';
import {tap} from 'rxjs/operators';
import {UserStateModel} from '../../users/shared/user.state';
import {UserService} from '../../users/shared/user.service';

export class AuthStateModel {
  loggedInUser: AuthUser;
  userName: string;
  role: string;
}
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loggedInUser: undefined,
    userName: undefined,
    role: undefined
  }
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Selector()
  static loggedInUser(state: AuthStateModel) {
    return state.loggedInUser;
  }

  @Action(LoginEmail)
  loginEmail(ctx: StateContext<AuthStateModel>, action: LoginEmail) {
     const state = ctx.getState();
     return this.authService
       .logInEmail(action.email, action.password)
       .pipe(
         tap((result) => {
           ctx.setState({
             ...state,
             loggedInUser: result,
             userName: result.mUserName
           });
           ctx.dispatch(new GetUser(result.mUId));
         })
       );
  }

  @Action(GetUser)
  getUser(ctx: StateContext<AuthStateModel>, action: GetUser) {
    const state = ctx.getState();
    return this.authService.getUser(action.uid).pipe(
      tap((result) => {
        ctx.setState({
          ...state,
          loggedInUser: result,
          userName: result.mUserName
        });
      })
    );
  }
  @Action(UpdateUser)
  update({getState, setState}: StateContext<AuthStateModel>, {payload}: UpdateUser) {
    if (this.userService.updateUser(payload)) {
      const state = getState();
      setState({
        ...state,
        loggedInUser: payload
      });
      return true;
    } else {
      return false;
    }
  }
}
