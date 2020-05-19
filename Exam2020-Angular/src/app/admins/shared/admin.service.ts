import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {AuthUser} from '../../auth/shared/authUser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private af: AngularFirestore) { }

  userReadAll(userUid: string): Observable<AuthUser[]> {
    return this.af.collection<AuthUser>('users')
      .snapshotChanges().pipe(
        map(value => {
          return this.mapChangeAction(value);
        })
      );
  }

  private mapChangeAction(value: DocumentChangeAction<AuthUser>[]): AuthUser[] {
    return value.map(docAction => {
      const data = docAction.payload.doc.data();
      const user: AuthUser = {
        mEmail: data.mEmail,
        mUserName: data.mUserName,
        mName: data.mName,
        mUId: data.mUId,
        mImageUrl: data.mImageUrl,
        mCertificateList: data.mCertificateList
      };
      return user;
    });
  }
}
