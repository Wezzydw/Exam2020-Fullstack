import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificateAddComponent } from './certificate-add/certificate-add.component';
import { CertificateDetailComponent } from './certificate-detail/certificate-detail.component';
import {CertificatesRoutingModule} from './certificates-routing.module';



@NgModule({
  declarations: [CertificateListComponent, CertificateAddComponent, CertificateDetailComponent],
  imports: [
    CommonModule, CertificatesRoutingModule
  ]
})
export class CertificatesModule { }
