import { Component, OnInit } from '@angular/core';
import {Certificate} from '../shared/certificate';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {CertificateAdd} from '../shared/certificate.action';

@Component({
  selector: 'app-certificate-add',
  templateUrl: './certificate-add.component.html',
  styleUrls: ['./certificate-add.component.css']
})
export class CertificateAddComponent implements OnInit {
private certificate: Certificate;



  certificateForm = new FormGroup({
    mName: new FormControl(''),
    mExpirationDate: new FormControl(''),
    mPhoto: new FormControl('')
  });
  constructor(private store: Store) {}

  ngOnInit() {
  }


  addCertificate() {
    const mName = this.certificateForm.get('mName').value;
    const mExpirationDate = this.certificateForm.get('mExpirationDate').value;
    const mPhoto = this.certificateForm.get('mPhoto').value;
    const certificate: Certificate = {mName, mExpirationDate, mPhoto};
    console.log(certificate);
    debugger;
    this.store.dispatch(new CertificateAdd (certificate));
  }
}
