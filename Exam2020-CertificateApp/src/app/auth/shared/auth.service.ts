import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {auth, User} from 'firebase/app';
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
    return from(this.afAuth.signInWithEmailAndPassword(email, password))
      .pipe(
        map(credential => this.firebaseUserToAuthUser(credential.user))
      );
  }
  async logOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
  async registerEmail(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
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
