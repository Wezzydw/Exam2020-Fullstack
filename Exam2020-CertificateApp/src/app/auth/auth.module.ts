import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthRoutingModule} from './auth-routing.module';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }