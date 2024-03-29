import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ToastModule} from "primeng/toast";
import {TabViewModule} from "primeng/tabview";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessageService} from "primeng/api";
import {HttpClientModule} from "@angular/common/http";
import { NotFoundComponent } from './page/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      TabViewModule,
      ToastModule,
      FormsModule,
      BrowserAnimationsModule
    ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
