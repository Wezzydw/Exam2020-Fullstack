import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {UserDetailComponent} from './users/user-detail/user-detail.component';
import {CertificateDetailComponent} from './certificates/certificate-detail/certificate-detail.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
  { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  { path: 'cert', loadChildren: () => import('./certificates/certificates.module').then(m => m.CertificatesModule)},
  { path: '', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
