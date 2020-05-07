import {AuthUser} from './authUser';
import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AuthService} from './auth.service';
import {GetImage, GetUser, LoginEmail, UpdateUser,} from './auth.action';
import {map, tap} from 'rxjs/operators';
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
  update(ctx: StateContext<AuthStateModel>, {payload, image}: UpdateUser) {
    if (image != null) {
      console.log('ImagenotNull');
      this.userService.uploadImage(image, payload.mUId).then( a => {
        console.log('waiting', a);
        this.userService.updateUser(payload);
        const user = AuthState.loggedInUser(ctx.getState());
        console.log('before getimage');
        return this.userService.getImage(payload.mUId).then(result => {
          console.log('before ctx')
          payload.mImageUrl = result;
          ctx.setState({
            ...ctx.getState(),
            loggedInUser: payload
          });
        });
      });

    } else {
      this.userService.updateUser(payload);
      const user = AuthState.loggedInUser(ctx.getState());
      console.log('before getimage');
      return this.userService.getImage(payload.mUId).then(result => {
        console.log('before ctx')
        payload.mImageUrl = result;
        ctx.setState({
          ...ctx.getState(),
          loggedInUser: payload
        });
      });
    }

    //ctx.dispatch(new GetImage(payload.mUId));
  }
  @Action(GetImage)
  getImage({getState, setState}: StateContext<AuthStateModel>, {uid}: GetUser) {

    const state = getState();
    // return this.userService.getImage(uid).pipe(tap( result => {
    //   setState({
    //     ...state,
    //     role: result
    //   });
    // }));
  }

}
