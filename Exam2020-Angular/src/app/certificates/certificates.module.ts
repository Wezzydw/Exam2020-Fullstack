import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificateAddComponent } from './certificate-add/certificate-add.component';
import { CertificateDetailComponent } from './certificate-detail/certificate-detail.component';
import {CertificatesRoutingModule} from './certificates-routing.module';
import {MatCardModule, MatFormFieldModule, MatRadioModule, MatSlideToggleModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [CertificateListComponent, CertificateAddComponent, CertificateDetailComponent],
  imports: [
    CommonModule, CertificatesRoutingModule, MatCardModule, MatFormFieldModule, MatRadioModule, MatSlideToggleModule, ReactiveFormsModule
  ]
})
export class CertificatesModule { }
