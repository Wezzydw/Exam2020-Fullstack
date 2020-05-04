import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {UserDetailComponent} from './users/user-detail/user-detail.component';
import {CertificateDetailComponent} from './certificates/certificate-detail/certificate-detail.component';

const routes: Routes = [{
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(n => n.AuthModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
