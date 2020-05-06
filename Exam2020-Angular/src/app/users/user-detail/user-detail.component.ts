import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Userstats} from '../shared/userstats';
import {Select, Store} from '@ngxs/store';
import {GetUser, } from '../shared/user.actions';
import {UserState} from '../shared/user.state';
import {Observable} from 'rxjs';
import {GetImage, LoginEmail, UpdateUser} from '../../auth/shared/auth.action';
import {AuthUser} from '../../auth/shared/authUser';
import {AuthState} from '../../auth/shared/auth.state';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Select(AuthState.loggedInUser)
  loggedInUser$: Observable<AuthUser>;
  payload: AuthUser;
  userSub: AuthUser;
  image: File;
  userSettings;
  userForm;
  constructor(private formBuilder: FormBuilder, private store: Store) {this.userForm = this.formBuilder.group({
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
      }

      //this.payload.mPhone = data.phone;
      //this.payload.mEmail = data.email;
      //this.payload.mUserName = data.username;
      //this.payload.mName = data.name;
      //this.payload.mUId = this.userSub.mUId;
      //this.editUserData(this.payload);
      console.log('payload', bar);
    this.editUserData(bar);
    this.loggedInUser$.subscribe(res => {
      this.userSub = res;
    });
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
}
