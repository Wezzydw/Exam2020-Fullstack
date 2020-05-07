import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificateAddComponent } from './certificate-add/certificate-add.component';
import { CertificateDetailComponent } from './certificate-detail/certificate-detail.component';
import {CertificatesRoutingModule} from './certificates-routing.module';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [CertificateListComponent, CertificateAddComponent, CertificateDetailComponent],
  imports: [
    CommonModule, CertificatesRoutingModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule, MatButtonModule
  ]
})
export class CertificatesModule { }
