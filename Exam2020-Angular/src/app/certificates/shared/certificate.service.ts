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
  tableData: any[] = [];
  firstInResponse: any = [];
  lastInResponse: any = [];
  prevStartAt: any = [];


  certificateImageUpload(path: string, image: File) {
    return this.as.ref(path).put(image).then( a => {
      return a;
    });
  }

  constructor(private af: AngularFirestore, private as: AngularFireStorage) { }
  certificateAdd(certificate: Certificate) {
    return this.af.collection('certificates').add(certificate);
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

  // loadItems() {
  //   this.af.collection('certificates', ref => ref
  //     .limit(5)
  //     .orderBy('mName', 'desc')
  //   ).snapshotChanges()
  //     .subscribe(response => {
  //       if (!response.length) {
  //         console.log('No Data Available');
  //         return false;
  //       }
  //       this.firstInResponse = response[0].payload.doc;
  //       this.lastInResponse = response[response.length - 1].payload.doc;
  //
  //       this.tableData = [];
  //       for (const item of response) {
  //         this.tableData.push(item.payload.doc.data());
  //       }
  //
  //       // Initialize values
  //       this.prevStartAt = [];
  //       this.paginationClickedCount = 0;
  //       this.disableNext = false;
  //       this.disablePrev = false;
  //
  //       // Push first item to use for Previous action
  //       this.pushPrevStartAt(this.firstInResponse);
  //     }, error => {
  //     });
  // }
  // prevPage() {
  //   this.disablePrev = true;
  //   this.af.collection('certificates', ref => ref
  //     .orderBy('mName', 'desc')
  //     .startAt(this.getPrevStartAt())
  //     .endBefore(this.firstInResponse)
  //     .limit(5)
  //   ).get()
  //     .subscribe(response => {
  //       this.firstInResponse = response.docs[0];
  //       this.lastInResponse = response.docs[response.docs.length - 1];
  //
  //       this.tableData = [];
  //       for (const item of response.docs) {
  //         this.tableData.push(item.data());
  //       }
  //
  //       // Maintaing page no.
  //       this.paginationClickedCount--;
  //
  //       // Enable buttons again
  //       this.disablePrev = false;
  //       this.disableNext = false;
  //     }, error => {
  //       this.disablePrev = false;
  //     });
  // }
  //
  // nextPage() {
  //   this.disableNext = true;
  //   this.af.collection('certificates', ref => ref
  //     .limit(5)
  //     .orderBy('mName', 'desc')
  //     .startAfter(this.lastInResponse)
  //   ).get()
  //     .subscribe(response => {
  //
  //       if (!response.docs.length) {
  //         this.disableNext = true;
  //         return;
  //       }
  //
  //       this.firstInResponse = response.docs[0];
  //
  //       this.lastInResponse = response.docs[response.docs.length - 1];
  //       this.tableData = [];
  //       for (const item of response.docs) {
  //         this.tableData.push(item.data());
  //       }
  //
  //       this.paginationClickedCount++;
  //
  //       this.pushPrevStartAt(this.firstInResponse);
  //
  //       this.disableNext = false;
  //     }, error => {
  //       this.disableNext = false;
  //     });
  // }
  //
  // getPrevStartAt() {
  //   if (this.prevStartAt.length > (this.paginationClickedCount + 1)) {
  //     this.prevStartAt.splice(this.prevStartAt.length - 2, this.prevStartAt.length - 1);
  //   }
  //   return this.prevStartAt[this.paginationClickedCount - 1];
  // }
  //
  // private pushPrevStartAt(firstInResponse: any) {
  //   this.prevStartAt.push(firstInResponse);
  // }
}
