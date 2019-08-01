import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChatLobbyComponent } from './chat-lobby/chat-lobby.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'chat-lobby', component: ChatLobbyComponent},
  {path: 'chat-room/:roomId', component : ChatComponent}
 // {path: '**', component: NotFoundComponent, pathMatch: "full"}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
