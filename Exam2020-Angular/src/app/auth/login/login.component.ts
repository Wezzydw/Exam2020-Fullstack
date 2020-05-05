import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../shared/auth.state';
import {AuthUser} from '../shared/authUser';
import {Observable} from 'rxjs';
import {LoginEmail} from '../shared/auth.action';
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // loginForm: FormGroup;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  @Select(AuthState.loggedInUser)
  loggedInUser$: Observable<AuthUser>;
  constructor(private store: Store, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   userName: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
  }
  loginWithEmail() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    // this.authService.logInEmail(email, password);
    this.store.dispatch(new LoginEmail(email, password));
  }
}
