import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Certificate} from '../shared/certificate';
import {Select, Store} from '@ngxs/store';
import {CertificateReadAll, SetSelectedCertificate} from '../shared/certificate.action';
import {AuthState} from '../../auth/shared/auth.state';
import {AuthUser} from '../../auth/shared/authUser';
import {CertificateState} from '../shared/certificate.state';
import {Navigate} from '@ngxs/router-plugin';

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

  certificates: Certificate[];
  constructor(
    private store: Store
  ) {  }

  ngOnInit() {
    this.loggedInUser$.subscribe(res => {
      this.userSub = res;
    });
    this.store.dispatch(new CertificateReadAll(this.userSub.mUId));
    this.certificates$.subscribe(res => {
      this.certificates = res;
    });
    // this.certificates$.subscribe( result => {
    //   this.certificates = result;
    // });

    // this.certificates$ = from(this.af.firestore.collection('certificates')
    //   .where('userUid', '==', 'SluEwNNVe6gjGmZD1Z3STvLelOa2').get().then(value => {
    //   // const allCert: Certificate[] = [{mUid: 'see', mExpirationDate: 'see', mName: '22'}];
    //   const allCert: Certificate[] = [];
    //   debugger;
    //   const len = value.size;
    //   value.forEach(result => {
    //     const cert = result.data() as Certificate;
    //     allCert.push(cert);
    //   });
    //   return allCert;
    // }));
  }

  // getAllCertificates() {
  //   this.certificates$ = this.store.dispatch(new CertificateReadAll());
  // }
  goToDetails(cert: Certificate) {
    this.store.dispatch(new SetSelectedCertificate(cert)); // certificate detail
  }
}
