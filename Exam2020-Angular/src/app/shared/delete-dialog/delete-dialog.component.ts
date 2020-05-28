import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Select, Store} from '@ngxs/store';
import {CertificateState} from '../../certificates/shared/certificate.state';
import {Observable} from 'rxjs';
import {Certificate} from '../../certificates/shared/certificate';
import {CertificateDelete} from '../../certificates/shared/certificate.action';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  message = 'Are you sure want to delete this certificate';
  @Select(CertificateState.selectedCertificate)
  SelectedCertificate$: Observable<Certificate>;
  private certificate: Certificate;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, public store: Store) { }

  ngOnInit() {this.SelectedCertificate$.subscribe(value => {
    this.certificate = value;
  });
  }

  closeWindow() {
    this.dialogRef.close();
  }

  deleteCertificate() {
    this.store.dispatch(new CertificateDelete(this.certificate));
    this.closeWindow();
  }

}
