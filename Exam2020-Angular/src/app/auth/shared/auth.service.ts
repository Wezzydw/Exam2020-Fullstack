import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {User} from 'firebase/app';
import {from, Observable} from 'rxjs';
import {AuthUser} from './authUser';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }
  logInEmail(email: string, password: string): Observable<AuthUser> {
    // const provider = new auth.EmailAuthProvider();
    // const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    // this.getUser(credential.user.uid);
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        map(credential => this.firebaseUserToAuthUser(credential.user))
      );
  }
  async logOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
  registerUser(email: string, password: string): Observable<AuthUser> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password))
     .pipe(
       map(credential => this.firebaseUserToAuthUser(credential.user))
     );
  }

  private getUser(uid: string): AuthUser {
    return undefined;
    // userservice get user from db
  }
  private firebaseUserToAuthUser(user: User): AuthUser {
    if (user) {
      return this.getUser(user.uid);
    }
  }
}
