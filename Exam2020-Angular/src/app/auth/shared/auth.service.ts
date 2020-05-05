import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {User} from 'firebase/app';
import {from, Observable} from 'rxjs';
import {AuthUser} from './authUser';
import {first, map, tap} from 'rxjs/operators';
import {UserService} from '../../users/shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private userService: UserService
  ) { }
  logInEmail(email: string, password: string): Observable<AuthUser> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        map(credential => this.firebaseUserToAuthUser(credential.user))
      );
  }
  async logOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
  async registerEmail(email: string, password: string) {
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  getUser(uid: string): Observable<AuthUser> {
    return this.userService.getUser(uid);
    // return undefined;
  }
  firebaseUserToAuthUser(user: User): AuthUser {
    if (user) {
      // return this.getUser(user.uid).pipe(
      //   first(),
      //   map(value => {
      //     return {
      //       mUId: value.mUId,
      //       mUserName: value.mUserName,
      //       mEmail: value.mEmail
      //     }
      //   })
      // );
      return {
        mUId: user.uid,
        mUserName: user.displayName,
        mEmail: user.email
      };
    }
  }
}
