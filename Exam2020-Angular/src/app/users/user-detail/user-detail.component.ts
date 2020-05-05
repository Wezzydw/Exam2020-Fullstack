import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Userstats} from '../shared/userstats';
import {Select, Store} from '@ngxs/store';
import {GetUser, UpdateUser} from '../shared/user.actions';
import {UserState} from '../shared/user.state';
import {Observable} from 'rxjs';
import {LoginEmail} from '../../auth/shared/auth.action';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
 @Select(UserState.getUser)
 user$: Observable<Userstats>;
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
    console.warn('BS', this.user$);
  }

  onSubmit(data) {
    console.warn('Data: ', data);
  }

  editUserData(payload: Userstats) {
    this.store.dispatch(new UpdateUser(payload));
  }

  login() {
    this.store.dispatch(new LoginEmail('a@hotmail.com', '12345678'));
  }
}
