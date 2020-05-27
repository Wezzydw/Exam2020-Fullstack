import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  { path: 'cert', loadChildren: () => import('./certificates/certificates.module').then(m => m.CertificatesModule)},
  { path: 'admin', loadChildren: () => import('./admins/admins.module').then(m => m.AdminsModule)},
  { path: '', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
