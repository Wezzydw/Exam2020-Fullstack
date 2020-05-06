import { Injectable } from '@angular/core';

import { Userstats} from './userstats';
import {HttpClient} from '@angular/common/http';

import {AngularFirestore} from '@angular/fire/firestore';
import {AuthUser} from '../../auth/shared/authUser';
import {map} from 'rxjs/operators';
import {from, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private af: AngularFirestore) { }
  getUser(uId: string): Observable<AuthUser> {
    return this.af.doc<AuthUser>('users/' + uId).get().pipe(
      map(value => {
        const data = value.data() as AuthUser;
        data.mUId = value.id;
        return data;
      })
    );
  }

  updateUser(payload: AuthUser): void {
    from(this.af.doc<AuthUser>('users/' + payload.mUId).update(payload));
  }
}
