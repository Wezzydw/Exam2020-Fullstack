import {AuthUser} from './authUser';
import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AuthService} from './auth.service';

import {GetImage, GetUser, LoginEmail, UpdateUser, LogOut, RegisterUser, DeleteUser} from './auth.action';
import {tap} from 'rxjs/operators';
import {UserService} from '../../users/shared/user.service';
import {Navigate} from '@ngxs/router-plugin';


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
           ctx.dispatch(new Navigate(['cert']));
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
  async update(ctx: StateContext<AuthStateModel>, {payload, image}: UpdateUser) {
    if (image != null) {
      await this.userService.uploadImage(image, payload.mUId).then( a => {
        return this.userService.getImage(payload.mUId).then(result => {
          payload.mImageUrl = result;
          this.userService.updateUser(payload);
        });
      });
      ctx.setState({
        ...ctx.getState(),
        loggedInUser: payload
      });

    } else {
      this.userService.updateUser(payload);
      return this.userService.getImage(payload.mUId).then(result => {
        payload.mImageUrl = result;
        ctx.setState({
          ...ctx.getState(),
          loggedInUser: payload
        });
      });
    }
  }
  @Action(LogOut)
  logOut(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.authService.logOut().pipe(
      tap((result) => {
        ctx.setState({
          ...state,
          loggedInUser: undefined,
          userName: undefined
        });
        ctx.dispatch(new Navigate(['auth']));
      })
    );
  }
  @Action(RegisterUser)
  registerUser(ctx: StateContext<AuthStateModel>, action: RegisterUser) {
    const state = ctx.getState();
    return this.authService
      .registerUser(action.email, action.password)
      .pipe(
        tap((result) => {
          result.mName = action.name;
          result.mUserName = action.userName;
          this.authService.createUserInDatabase(result);
          ctx.setState({
            ...state,
            loggedInUser: result
          });
          ctx.dispatch(new Navigate(['cert']));
        })
      );
  }

  @Action(DeleteUser)
  deleteUser(ctx: StateContext<AuthStateModel>, {uid}: DeleteUser) {
    const state = ctx.getState();
    this.authService.deleteUser();

  }
}
