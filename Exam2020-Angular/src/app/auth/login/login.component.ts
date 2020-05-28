import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../shared/auth.state';
import {AuthUser} from '../shared/authUser';
import {Observable} from 'rxjs';
import {LoginEmail, LogOut} from '../shared/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  @Select(AuthState.loggedInUser)
  loggedInUser$: Observable<AuthUser>;
  constructor(private store: Store) { }

  ngOnInit() { }
  loginWithEmail() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.store.dispatch(new LoginEmail(email, password));
  }
  logOut() {
    this.store.dispatch(new LogOut());
  }
}
