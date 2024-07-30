import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({

  declarations: [

    AppComponent,
  ],

  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],

  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {};
