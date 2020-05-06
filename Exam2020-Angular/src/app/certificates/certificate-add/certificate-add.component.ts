import { Component, OnInit } from '@angular/core';
import {Certificate} from '../shared/certificate';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-certificate-add',
  templateUrl: './certificate-add.component.html',
  styleUrls: ['./certificate-add.component.css']
})
export class CertificateAddComponent implements OnInit {
private certificate: Certificate;


  userForm;
  constructor(private formBuilder: FormBuilder, private store: Store) {this.userForm = this.formBuilder.group({
    name: '',
    mExpirationDate: '',
    mPhoto: ''
  }); }
  ngOnInit() {
  }

  onSubmit(value: any) {

  }
}
