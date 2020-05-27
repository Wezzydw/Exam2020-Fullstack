import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CertificateListComponent} from '../certificates/certificate-list/certificate-list.component';
import {AdminsModule} from './admins.module';
import {UsersViewComponent} from './users-view/users-view.component';
import {AdminUserDetailComponent} from './admin-user-detail/admin-user-detail.component';


const routes: Routes = [
  { path: '', component: UsersViewComponent},
  { path: 'user', component: AdminUserDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
