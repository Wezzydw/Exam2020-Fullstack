import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {GetUser, } from '../shared/user.actions';
import {Observable} from 'rxjs';
import {GetImage, LoginEmail, UpdateUser} from '../../auth/shared/auth.action';
import {AuthUser} from '../../auth/shared/authUser';
import {AuthState} from '../../auth/shared/auth.state';
import {MatDialog} from '@angular/material';
import {DeleteUserDialogComponent} from '../../shared/delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Select(AuthState.loggedInUser)
  loggedInUser$: Observable<AuthUser>;
  userSub: AuthUser;
  image: File;
  userForm;
  constructor(private formBuilder: FormBuilder, private store: Store, private dialogRef: MatDialog) {this.userForm = this.formBuilder.group({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: ''
  }); }

  ngOnInit() {
    this.store.dispatch(new GetUser());
    this.loggedInUser$.subscribe(res => {
      this.userSub = res;
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
      };
    if (this.image == null) {
        bar.mImageUrl = this.userSub.mImageUrl;
    }

    this.editUserData(bar);

  }

  editUserData(payload: AuthUser) {
    this.store.dispatch(new UpdateUser(payload, this.image));
  }

  imageFileSet(event) {
    this.image = event.target.files[0];
  }

  deleteUser() {
    this.dialogRef.open(DeleteUserDialogComponent);
  }
}
