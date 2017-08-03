import {AuthenticationComponent} from './authentication/authentication.component';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdButtonModule, MdInputModule, MdCheckboxModule, MdIconModule, MdListModule, MdSelectModule, MdSlideToggleModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CurrentTpComponent } from "./current-tp/current-tp.component";
import { HelpRequestComponent } from "./help-request/help-request.component";
import { SocketService } from "./shared/socket.service";
import { AdminComponent } from './admin/admin.component';
import { TpManagerComponent } from './admin/tp-manager/tp-manager.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdInputModule,
    MdCheckboxModule,
    MdIconModule,
    MdListModule,
    MdSelectModule,
    MdSlideToggleModule
  ],
  declarations: [
    AppComponent,
    CurrentTpComponent,
    AuthenticationComponent,
    HelpRequestComponent,
    AdminComponent,
    TpManagerComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
