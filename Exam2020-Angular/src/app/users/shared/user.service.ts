import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthUser} from '../../auth/shared/authUser';
import {map} from 'rxjs/operators';
import {from, Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private af: AngularFirestore, private as: AngularFireStorage) { }
  getUser(uId: string): Observable<AuthUser> {
    return this.af.doc<AuthUser>('users/' + uId).snapshotChanges().pipe(
      map(value => {
        const data = value.payload.data() as AuthUser;
        data.mUId = value.payload.id;
        return data;
      })
    );
  }

  updateUser(payload: AuthUser): Observable<AuthUser> {
    return from(this.af.doc<AuthUser>('users/' + payload.mUId).update(payload)).pipe(map(a => {
      return payload;
    }));

  }
  uploadImage(payload: File, uid: string): Promise<any> {
    return this.as.ref('images/' + uid + '/profilePicture').put(payload).then(a => {
      return a;
    });

  }
  getImage(uid: string): Promise<string>  {
    return this.as.ref('images/' + uid + '/profilePicture').getDownloadURL().toPromise();
  }
}
