import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userSettings;
  userForm;
  constructor(private formBuilder: FormBuilder) {this.userForm = this.formBuilder.group({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: ''
  }); }

  ngOnInit() {
  }

  onSubmit(data) {
    console.warn('Data: ', data);
  }
}
