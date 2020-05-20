import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import { UsersViewComponent } from './users-view/users-view.component';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule, MatInputModule, MatListModule, MatTableModule} from '@angular/material';
import { AdminUserDetailComponent } from './admin-user-detail/admin-user-detail.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [UsersViewComponent, AdminUserDetailComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FlexModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class AdminsModule { }
