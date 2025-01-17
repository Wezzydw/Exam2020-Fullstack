import { Injectable } from '@angular/core';


import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {Certificate} from './certificate';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {


  certificateImageUpload(path: string, image: File) {
    return this.as.ref(path).put(image).then( a => {
      return a;
    });
  }

  constructor(private af: AngularFirestore, private as: AngularFireStorage) { }
  certificateAdd(certificate: Certificate) {
    return this.af.collection('certificates').add(certificate);
  }

  deleteCertificate(mUId: string): Promise<string> {
    return this.af.collection<Certificate>('certificates').doc(mUId).delete().then(() => {
      return mUId;
    });
  }


  certificateReadAll(userUid: string): Observable<Certificate[]> {
    return this.af.collection<Certificate>('certificates', ref => ref.where('mUserUid', '==', userUid))
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
        mUId: data.mUId,
        mUserUid: data.mUserUid
      };
      return cert;
    });
  }
  getImageForCertificate(cert: Certificate): Promise<string> {
    return this.as.ref('images/' + cert.mUserUid + '/certificates/' + cert.mUId).getDownloadURL().toPromise();
  }
  updateCertificate(cert: Certificate): Promise<Certificate> {
    return this.af.doc('certificates/' + cert.mUId).update(cert).then(value => {
      return cert;
    });
  }

}
