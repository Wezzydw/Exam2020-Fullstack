import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {from, Observable} from 'rxjs';
import {Certificate} from './certificate';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private af: AngularFirestore, private as: AngularFireStorage) { }
  certificateReadAll(userUid: string): Observable<Certificate[]> {
    return this.af.collection<Certificate>('certificates', ref => ref.where('mUserUid', '==', 'SluEwNNVe6gjGmZD1Z3STvLelOa2'))
      .snapshotChanges().pipe(
        map(value => {
          return this.mapChangeAction(value);
        })
      );
  }
  private mapChangeAction(value: DocumentChangeAction<Certificate>[]): Certificate[] {
    return value.map(docAction => {
      const data = docAction.payload.doc.data();
      const cert: Certificate = {
        mName: data.mName,
        mExpirationDate: data.mExpirationDate,
        mUId: data.mUId
      };
      return cert;
    });
  }
}
