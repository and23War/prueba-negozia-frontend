import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';

import { AppRoutingModule } from './app-routing.module';

/* Configuration local lenguage */
import localeCo from '@angular/common/locales/es-CO';
registerLocaleData(localeCo);

/* Modules */
import { AppComponent } from './app.component';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SharedModule } from './shared/shared.module';

/**
 * Components
 */
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(),
    InterceptorsModule,
    SharedModule,
  ],
  providers: [
    LocalStorageService,
    { provide: LOCALE_ID, useValue: 'es-CO' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
