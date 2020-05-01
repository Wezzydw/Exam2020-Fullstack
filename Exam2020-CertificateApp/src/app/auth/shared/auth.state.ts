import {User} from './user';
import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AuthService} from './auth.service';
import {Login} from './auth.action';

export class AuthStateModel {
  loggedInUser: User;
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
  constructor(private authService: AuthService) {}

  @Selector()
  static loggedInUser(state: AuthStateModel) {
    return state.loggedInUser;
  }

  @Action(Login)
  loginWithGoogle(ctx: StateContext<AuthStateModel>) {
    // const state = ctx.getState();
    // return this.authService
    //   .loginGoogle().pipe(
    //     tap((result) => {
    //       ctx.setState({
    //         ...state,
    //         loggedInUser: result,
    //         userName: result.displayName
    //       });
    //       ctx.dispatch(new GetRole(result.uid));
    //     })
    //   );
  }

}
