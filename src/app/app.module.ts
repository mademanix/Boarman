import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {BaseModule} from "./base/base.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FlatResponseInterceptor} from "./shared/interceptors/flat-response.interceptor";
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    BaseModule,
    CoreModule,
    ToastModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: FlatResponseInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
