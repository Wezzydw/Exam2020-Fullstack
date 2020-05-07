import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {AppRoutingModule} from './app-routing.module';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {AuthState} from './auth/shared/auth.state';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([
      AuthState
    ]),
    NgxsStoragePluginModule.forRoot({
      key: 'auth'
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
