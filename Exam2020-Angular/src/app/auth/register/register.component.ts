
import {FormControl, FormGroup} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {AuthUser} from '../shared/authUser';
import {Store} from '@ngxs/store';
import {RegisterUser} from '../shared/auth.action';
import {User} from 'firebase';
import {MatDialog} from '@angular/material/dialog';
import {PopuppasswordComponent} from '../../shared/popuppassword/popuppassword.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: AuthUser;
  fireUser: User;
  dialogOpen: boolean;

  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    userName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(private store: Store, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dialogOpen = false;
  }

  register() {
    const name = this.userForm.get('name').value;
    const email = this.userForm.get('email').value;
    const userName = this.userForm.get('userName').value;
    const password = this.userForm.get('password').value;
    const confirmPassword = this.userForm.get('password').value;
    if (password === confirmPassword && password !== '') {
      this.store.dispatch(new RegisterUser(name, email, userName, password));
      this.dialogOpen = false;
    } else {
      this.dialogOpen = true;
    }
  }
}
