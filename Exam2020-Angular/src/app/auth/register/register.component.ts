import {User} from '../shared/user';
import {FormControl, FormGroup} from '@angular/forms';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;

  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    userName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor() {
  }

  ngOnInit() {
  }

  register() {

  }
}
