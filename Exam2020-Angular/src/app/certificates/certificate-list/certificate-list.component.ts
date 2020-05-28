import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Certificate} from '../shared/certificate';
import {Select, Store} from '@ngxs/store';
import {CertificateReadAll, SetSelectedCertificate} from '../shared/certificate.action';
import {AuthState} from '../../auth/shared/auth.state';
import {AuthUser} from '../../auth/shared/authUser';
import {CertificateState} from '../shared/certificate.state';

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
    private store: Store) {  }

  ngOnInit() {
    this.loggedInUser$.subscribe(res => {
      this.userSub = res;
    });
    this.store.dispatch(new CertificateReadAll(this.userSub.mUId));
    this.certificates$.subscribe(res => {
      this.certificates = res;
    });
  }



  goToDetails(cert: Certificate) {
    this.store.dispatch(new SetSelectedCertificate(cert)); // certificate detail
  }


}
