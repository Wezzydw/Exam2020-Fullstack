import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthUser} from '../../auth/shared/authUser';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

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
}
