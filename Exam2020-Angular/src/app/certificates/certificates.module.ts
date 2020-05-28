import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateListComponent } from './certificate-list/certificate-list.component';
import { CertificateAddComponent } from './certificate-add/certificate-add.component';
import { CertificateDetailComponent } from './certificate-detail/certificate-detail.component';
import {CertificatesRoutingModule} from './certificates-routing.module';
import {
  MatCardModule,
  MatFormFieldModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatDatepickerModule, MatNativeDateModule, MAT_DATE_FORMATS
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';



@NgModule({
  declarations: [CertificateListComponent, CertificateAddComponent, CertificateDetailComponent],
  //
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
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class CertificatesModule { }
