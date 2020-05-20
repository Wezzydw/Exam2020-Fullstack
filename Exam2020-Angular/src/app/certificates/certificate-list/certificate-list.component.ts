import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Certificate} from '../shared/certificate';
import {Select, Store} from '@ngxs/store';
import {CertificateReadAll, SetSelectedCertificate} from '../shared/certificate.action';
import {AuthState} from '../../auth/shared/auth.state';
import {AuthUser} from '../../auth/shared/authUser';
import {CertificateState} from '../shared/certificate.state';
import {Navigate} from '@ngxs/router-plugin';
import {AngularFirestore} from '@angular/fire/firestore';
import {snapshotChanges} from '@angular/fire/database';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.css']
})
export class CertificateListComponent implements OnInit {
  @Select(AuthState.loggedInUser)
  loggedInUser$: Observable<AuthUser>;
  @Select(CertificateState.certificates)
  certificates$: Observable<Certificate[]>;
  userSub: AuthUser;
  tableData: any[] = [];
  firstInResponse: any = [];
  lastInResponse: any = [];
  prevStartAt: any = [];
  paginationClickedCount = 0;
  disableNext = false;
  disablePrev = false;



  certificates: Certificate[];
  constructor(
    private store: Store,
    private af: AngularFirestore
   ) {  }

  ngOnInit() {
    this.loggedInUser$.subscribe(res => {
      this.userSub = res;
    });
    this.store.dispatch(new CertificateReadAll(this.userSub.mUId));
    this.certificates$.subscribe(res => {
      this.certificates = res;
    });
    // this.loadItems();
  }

  // getAllCertificates() {
  //   this.certificates$ = this.store.dispatch(new CertificateReadAll());
  // }
  goToDetails(cert: Certificate) {
    this.store.dispatch(new SetSelectedCertificate(cert)); // certificate detail
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
//       for (let item of response) {
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
//   prevPage() {
//     this.disablePrev = true;
//     this.af.collection('certificates', ref => ref
//       .orderBy('mName', 'desc')
//       .startAt(this.getPrevStartAt())
//       .endBefore(this.firstInResponse)
//       .limit(5)
//     ).get()
//       .subscribe(response => {
//         this.firstInResponse = response.docs[0];
//         this.lastInResponse = response.docs[response.docs.length - 1];
//
//         this.tableData = [];
//         for (let item of response.docs) {
//           this.tableData.push(item.data());
//         }
//
//         // Maintaing page no.
//         this.paginationClickedCount--;
//
//         // Enable buttons again
//         this.disablePrev = false;
//         this.disableNext = false;
//       }, error => {
//         this.disablePrev = false;
//       });
//   }
//
//   nextPage() {
//     this.disableNext = true;
//     this.af.collection('certificates', ref => ref
//       .limit(5)
//       .orderBy('mName', 'desc')
//       .startAfter(this.lastInResponse)
//     ).get()
//       .subscribe(response => {
//
//         if (!response.docs.length) {
//           this.disableNext = true;
//           return;
//         }
//
//         this.firstInResponse = response.docs[0];
//
//         this.lastInResponse = response.docs[response.docs.length - 1];
//         this.tableData = [];
//         for (let item of response.docs) {
//           this.tableData.push(item.data());
//         }
//
//         this.paginationClickedCount++;
//
//         this.pushPrevStartAt(this.firstInResponse);
//
//         this.disableNext = false;
//       }, error => {
//         this.disableNext = false;
//       });
//   }
//
//   getPrevStartAt() {
//     if (this.prevStartAt.length > (this.paginationClickedCount + 1))
//       this.prevStartAt.splice(this.prevStartAt.length - 2, this.prevStartAt.length - 1);
//     return this.prevStartAt[this.paginationClickedCount - 1];
//   }
//
//   private pushPrevStartAt(firstInResponse: any) {
//     this.prevStartAt.push(firstInResponse);
//   }



}
