import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthUser} from '../../auth/shared/authUser';
import {AuthState} from '../../auth/shared/auth.state';
import {Observable} from 'rxjs';
import {CertificateState} from '../shared/certificate.state';
import {Certificate} from '../shared/certificate';
import {FormControl, FormGroup} from '@angular/forms';
import {CertificateDelete, UpdateCertificate} from '../shared/certificate.action';
import {MAT_DATE_LOCALE, MatDialog} from '@angular/material';
import {DeleteDialogComponent} from '../../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class CertificateDetailComponent implements OnInit {
private user: AuthUser;
private certificate: Certificate;
private toUpdate = false;
private image: File;

@Select(AuthState.loggedInUser)
LoggedInUser$: Observable<AuthUser>;
@Select(CertificateState.selectedCertificate)
SelectedCertificate$: Observable<Certificate>;

   updateForm = new FormGroup({
   mPhoto: new FormControl(''),
   mName: new FormControl(''),
   mExpirationDate: new FormControl('')
 });
  constructor(private store: Store, public dialog: MatDialog) { }


  ngOnInit() {
    this.LoggedInUser$.subscribe(value => {
      this.user = value;
    });
    this.SelectedCertificate$.subscribe(value => {
      this.certificate = value;
    });
  }
  editCertificate() {
    this.certificate.mName = this.updateForm.get('mName').value;
    this.certificate.mExpirationDate = this.updateForm.get('mExpirationDate').value.toLocaleString().split(' ')[0].split('.').join('/');
    this.store.dispatch(new UpdateCertificate(this.certificate, this.image));
  }
  setImage(event) {
    this.image = event.target.files[0];
    console.log(this.image);
  }


  openDialog() {
    this.dialog.open(DeleteDialogComponent);
  }
}
