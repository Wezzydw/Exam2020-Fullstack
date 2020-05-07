import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {from, Observable} from 'rxjs';
import {Certificate} from './certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private af: AngularFirestore, private as: AngularFireStorage) { }
  certificateReadAll(userUid: string): Promise<Certificate[]> {
    return this.af.firestore.collection('certificates').where('userUid', '==', userUid).get().then(value => {
      // const allCert: Certificate[] = [{mUid: 'see', mExpirationDate: 'see', mName: '22'}];
      const allCert: Certificate[] = [];
      value.forEach(result => {
        const cert = result.data() as Certificate;
        allCert.push(cert);
      });
      return allCert;
    });
  }
}
