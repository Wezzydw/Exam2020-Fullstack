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

import {UserDetailComponent} from './users/user-detail/user-detail.component';
import {CertificateDetailComponent} from './certificates/certificate-detail/certificate-detail.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material';
import {UserState} from './users/shared/user.state';
import {NgxsRouterPluginModule} from '@ngxs/router-plugin';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {AuthState} from './auth/shared/auth.state';
import { PopuppasswordComponent } from './shared/popuppassword/popuppassword.component';
import { MatDialogModule} from '@angular/material';
import {CertificateState} from './certificates/shared/certificate.state';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PopuppasswordComponent,
  ],
  imports: [
    BrowserModule,

    NgxsModule.forRoot([
      UserState,
      AuthState,
      CertificateState
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
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDialogModule
  ],
  entryComponents: [
    PopuppasswordComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
