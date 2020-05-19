import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import { UsersViewComponent } from './users-view/users-view.component';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule, MatListModule} from '@angular/material';



@NgModule({
  declarations: [UsersViewComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FlexModule,
    MatCardModule,
    MatListModule
  ]
})
export class AdminsModule { }
