import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {AuthUser} from '../../auth/shared/authUser';
import {FormBuilder} from '@angular/forms';
import {GetUser} from '../../users/shared/user.actions';
import {DeleteUser, GetImage, LoginEmail, LogOut, UpdateUser} from '../../auth/shared/auth.action';
import {AdminState} from '../shared/admin.state';
import {CertificateReadAll, SetSelectedCertificate} from '../../certificates/shared/certificate.action';
import {Certificate} from '../../certificates/shared/certificate';
import {CertificateState} from '../../certificates/shared/certificate.state';

@Component({
  selector: 'app-admin-user-detail',
  templateUrl: './admin-user-detail.component.html',
  styleUrls: ['./admin-user-detail.component.scss']
})
export class AdminUserDetailComponent implements OnInit {

  @Select(AdminState.selectedUser)
  selectedUser$: Observable<AuthUser>;
  payload: AuthUser;
  userSub: AuthUser;
  image: File;
  userSettings;
  userForm;
  private cert: Certificate;
  certificates: Certificate[];
  @Select(CertificateState.certificates)
  certificates$: Observable<Certificate[]>;

  constructor(private formBuilder: FormBuilder, private store: Store) {this.userForm = this.formBuilder.group({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: ''
  }); }

  ngOnInit() {
    this.store.dispatch(new GetUser());
    this.selectedUser$.subscribe(res => {
      this.userSub = res;
    });
    this.store.dispatch(new CertificateReadAll(this.userSub.mUId));
    this.certificates$.subscribe(res => {
      this.certificates = res;
    });
  }

  onSubmit(data) {
    if (data.phone === '') {
      this.userForm.value.phone = this.userSub.mPhone.toString();
    }
    if (data.email === '') {
      this.userForm.value.email = this.userSub.mEmail;
    }
    if (data.username === '') {
      this.userForm.value.username = this.userSub.mUserName;
    }
    if (data.name === '') {
      this.userForm.value.name = this.userSub.mName;
    }

    console.warn('BS', this.userSub);
    const bar: AuthUser = {
      mName: data.name,
      mEmail: data.email,
      mUId: this.userSub.mUId,
      mUserName: data.username,
      mPhone: data.phone.toString(),
    }
    if (this.image == null) {
      bar.mImageUrl = this.userSub.mImageUrl;
    }

    //this.payload.mPhone = data.phone;
    //this.payload.mEmail = data.email;
    //this.payload.mUserName = data.username;
    //this.payload.mName = data.name;
    //this.payload.mUId = this.userSub.mUId;
    //this.editUserData(this.payload);
    console.log('payload', bar);
    this.editUserData(bar);

  }

  editUserData(payload: AuthUser) {
    if (this.store.dispatch(new UpdateUser(payload, this.image))) {
      console.log('Succes saving changes');
    } else {
      console.log('saving not successfullyyyllllulyy');
    }
  }

  login() {
    console.warn('login');
    this.store.dispatch(new LoginEmail('a@hotmail.com', '12345678'));
  }

  imageFileSet(event) {
    this.image = event.target.files[0];
  }

  getProfilePic(uid: string) {
    this.store.dispatch(new GetImage(uid));
  }
  deleteUser() {
    this.store.dispatch(new DeleteUser(this.userSub.mUId));
    this.store.dispatch(new LogOut());
  }

  goToCertificateDetails(certificate: Certificate) {
    this.store.dispatch(new SetSelectedCertificate(certificate));
  }
}
