import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthUser} from '../../auth/shared/authUser';
import {AuthState} from '../../auth/shared/auth.state';
import {Observable} from 'rxjs';
import {CertificateState} from '../shared/certificate.state';
import {Certificate} from '../shared/certificate';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.css']
})
export class CertificateDetailComponent implements OnInit {
private user: AuthUser;
private certificate: Certificate;
private toUpdate = false;

@Select(AuthState.loggedInUser)
LoggedInUser$: Observable<AuthUser>;
@Select(CertificateState.selectedCertificate)
SelectedCertificate$: Observable<Certificate>;
  constructor(private store: Store) { }

  ngOnInit() {
    this.LoggedInUser$.subscribe(value => {
      this.user = value;
    });
    this.SelectedCertificate$.subscribe(value => {
      this.certificate = value;
    });
  }

  editCertificate() {
    this.store.dispatch(this.);
  }
}
