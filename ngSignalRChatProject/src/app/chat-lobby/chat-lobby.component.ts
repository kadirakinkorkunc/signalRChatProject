import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../services/data-transfer.service';
import { HubConnection } from '@aspnet/signalr';
import { ConnectionHubService } from '../services/connection-hub.service';
import { findLast } from '@angular/compiler/src/directive_resolver';


class Room {
  constructor(public roomId: number) {
  }
}

@Component({
  selector: 'app-chat-lobby',
  templateUrl: './chat-lobby.component.html',
  styleUrls: ['./chat-lobby.component.css']
})
export class ChatLobbyComponent implements OnInit {
  rooms: Room[] = [];
  hubCon: HubConnection;
  panelOpenState = false;
  constructor(private hubConService: ConnectionHubService
  ) { }


  ngOnInit() {
    this.hubConService.attachRoomsEvent();
    this.rooms = this.hubConService.rooms;
    this.hubConService.roomsChanged.subscribe(rooms => {
      this.rooms = rooms;
    });
  }



  addChatButton() {
    this.hubConService.newRoom();
  }

}
