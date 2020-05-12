import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthUser} from '../../auth/shared/authUser';
import {AuthState} from '../../auth/shared/auth.state';
import {Observable} from 'rxjs';
import {CertificateState} from '../shared/certificate.state';
import {Certificate} from '../shared/certificate';
import {FormControl, FormGroup} from '@angular/forms';
import {UpdateCertificate} from '../shared/certificate.action';

@Component({
  selector: 'app-certificate-detail',
  templateUrl: './certificate-detail.component.html',
  styleUrls: ['./certificate-detail.component.css']
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
    debugger;
    this.certificate.mName = this.updateForm.get('mName').value;
    this.certificate.mExpirationDate = this.updateForm.get('mExpirationDate').value;
    this.store.dispatch(new UpdateCertificate(this.certificate, this.image));
  }
  setImage(event) {
    this.image = event.target.files[0];
    console.log(this.image);
  }
}
