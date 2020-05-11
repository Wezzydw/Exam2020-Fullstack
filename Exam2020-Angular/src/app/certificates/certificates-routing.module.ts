import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CertificateDetailComponent} from './certificate-detail/certificate-detail.component';
import {CertificateAddComponent} from './certificate-add/certificate-add.component';
import {CertificateListComponent} from './certificate-list/certificate-list.component';

const routes: Routes = [

  { path: '', component: CertificateListComponent},
  { path: 'add', component: CertificateAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatesRoutingModule { }
