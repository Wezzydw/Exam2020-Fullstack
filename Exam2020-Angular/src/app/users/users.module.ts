import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {UsersRoutingModule} from './users-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';



@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [
    CommonModule, UsersRoutingModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ]
})
export class UsersModule { }
