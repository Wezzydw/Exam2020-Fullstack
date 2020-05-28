import { Component, OnInit } from '@angular/core';
import {Certificate} from '../shared/certificate';
import {FormControl, FormGroup} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {CertificateAdd} from '../shared/certificate.action';
import {AuthState} from '../../auth/shared/auth.state';
import {Observable} from 'rxjs';
import {AuthUser} from '../../auth/shared/authUser';
import {MAT_DATE_LOCALE} from '@angular/material';




@Component({
  selector: 'app-certificate-add',
  templateUrl: './certificate-add.component.html',
  styleUrls: ['./certificate-add.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class CertificateAddComponent implements OnInit {
image;
  @Select(AuthState.loggedInUser)
  loggedInUser$: Observable<AuthUser>;
  userSub: AuthUser;

  certificateForm = new FormGroup({
    mName: new FormControl(''),
    mExpirationDate: new FormControl(''),
    mPhoto: new FormControl('')
  });
  constructor(private store: Store) {}

  ngOnInit() {
    this.loggedInUser$.subscribe(res => {
      this.userSub = res;
    });
  }


  addCertificate() {
    const mName = this.certificateForm.get('mName').value;
    const mExpirationDate = this.certificateForm.get('mExpirationDate').value.toLocaleString().split(', ')[0].split('.').join('/');
    const mPhoto = this.certificateForm.get('mPhoto').value;
    const certificate: Certificate = {mName, mExpirationDate, mPhoto};
    certificate.mUserUid = this.userSub.mUId;
    this.store.dispatch(new CertificateAdd (certificate, this.image, this.userSub.mUId));
  }

  setImage(event) {
    this.image = event.target.files[0];
  }
}
