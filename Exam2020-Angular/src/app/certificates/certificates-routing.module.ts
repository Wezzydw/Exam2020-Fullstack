import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CertificateDetailComponent} from './certificate-detail/certificate-detail.component';
import {CertificateAddComponent} from './certificate-add/certificate-add.component';

const routes: Routes = [
  { path: '', component: CertificateDetailComponent},
  { path: 'test', component: CertificateAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatesRoutingModule { }
