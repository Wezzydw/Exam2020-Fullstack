import { Component, OnInit } from '@angular/core';
import {from, Observable} from 'rxjs';
import {Certificate} from '../shared/certificate';
import {Select, Store} from '@ngxs/store';
import {CertificateReadAll} from '../shared/certificate.action';
import {AuthState} from '../../auth/shared/auth.state';
import {AuthUser} from '../../auth/shared/authUser';
import {CertificateState} from '../shared/certificate.state';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

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

  certificates: Observable<Certificate[]>;
  constructor(
    private store: Store,
    private af: AngularFirestore
  ) {  }

  ngOnInit() {
    this.loggedInUser$.subscribe(res => {
      this.userSub = res;
    });
    // this.store.dispatch(new CertificateReadAll(this.userSub.mUId));
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

    this.certificates = this.af.collection<Certificate>('certificates', ref => ref.where('mUserUid', '==', 'SluEwNNVe6gjGmZD1Z3STvLelOa2'))
      .snapshotChanges().pipe(
      map(value => {
        return this.mapChangeAction(value);
      })
    );
  }

  // getAllCertificates() {
  //   this.certificates$ = this.store.dispatch(new CertificateReadAll());
  // }
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
