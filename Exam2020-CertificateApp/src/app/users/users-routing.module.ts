import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CertificateDetailComponent} from '../certificates/certificate-detail/certificate-detail.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: UserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
