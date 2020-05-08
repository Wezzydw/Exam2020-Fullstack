import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Certificate} from './certificate';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private firestore: AngularFirestore, private as: AngularFireStorage) { }
  certificateAdd(certificate: Certificate) {
    return this.firestore.collection('certificates').add(certificate);
  }
  certificateImageUpload(path: string, image: File) {
    return this.as.ref(path).put(image).then( a => {
      return a;
    });
  }
}
