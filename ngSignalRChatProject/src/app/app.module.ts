import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatLobbyComponent } from './chat-lobby/chat-lobby.component';
import { MaterialModule } from './material/material.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import { ConnectionHubService } from './services/connection-hub.service';



@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatLobbyComponent,
    NotFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,

    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,

  ],
  providers: [HubConnectionBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
