import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificateAddComponent } from './certificate-add/certificate-add.component';
import { CertificateDetailComponent } from './certificate-detail/certificate-detail.component';
import {CertificatesRoutingModule} from './certificates-routing.module';
import {MatCardModule, MatFormFieldModule, MatRadioModule, MatSlideToggleModule, MatButtonModule,  MatInputModule, MatListModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';



@NgModule({
  declarations: [CertificateListComponent, CertificateAddComponent, CertificateDetailComponent],
  imports: [
    MatRadioModule,
    MatSlideToggleModule,
    CommonModule,
    CertificatesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    FlexLayoutModule
  ]
})
export class CertificatesModule { }
