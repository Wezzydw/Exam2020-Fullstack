import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthUser} from '../shared/authUser';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../shared/auth.state';
import {Navigate} from '@ngxs/router-plugin';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  @Select(AuthState.loggedInUser)
  authUser$: Observable<AuthUser>;

  constructor(private router: Router, private store: Store) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authUser$
      .pipe(
        map(authUser => {
          if (authUser === undefined) {
            this.store.dispatch(new Navigate(['auth']));
            return false;
          }
          return authUser !== undefined;
        })
      );
  }
}
