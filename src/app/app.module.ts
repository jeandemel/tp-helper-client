import {AuthenticationComponent} from './authentication/authentication.component';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdButtonModule, MdInputModule, MdCheckboxModule, MdIconModule, MdListModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CurrentTpComponent } from "./current-tp/current-tp.component";
import { HelpRequestComponent } from "./help-request/help-request.component";
import { SocketService } from "./shared/socket.service";

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdInputModule,
    MdCheckboxModule,
    MdIconModule,
    MdListModule
  ],
  declarations: [
    AppComponent,
    CurrentTpComponent,
    AuthenticationComponent,
    HelpRequestComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
