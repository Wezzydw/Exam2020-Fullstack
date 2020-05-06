import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Certificate} from './certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private firestore: AngularFirestore) { }
  certificateAdd(certificate: Certificate) {
    return this.firestore.collection('/certificates').add(certificate);
  }
}
