import { Injectable, OnInit } from '@angular/core';
import * as SR from '@aspnet/signalr';
import { Subject } from 'rxjs';

class Room {
  constructor(public roomId: number) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionHubService {
  hubConnection: SR.HubConnection;
  rooms: Room[] = [];
  i = 0;
  roomsChanged: Subject<Room[]> = new Subject(); // listener for rooms changed situation
  constructor() {
  }


  public async createAndConnect(): Promise<void> {
    this.hubConnection = new SR.HubConnectionBuilder()
      .configureLogging(SR.LogLevel.Debug)
      .withUrl('https://localhost:5001/chatpage', {
        skipNegotiation: true,
        transport: SR.HttpTransportType.WebSockets
      })
      .build();
    return this.hubConnection.start();
  }

  public async newRoom() {
    this.i = this.rooms.length + 1;
    const newRoom = new Room(this.i);
    this.rooms.push(newRoom);


    try {
      this.hubConnection
        .invoke('AddAGroup', this.rooms);
    } catch (err) {
      console.log('addagroup invoke edilirken hata :', err);
    }



  }
  public attachRoomsEvent() {
    this.hubConnection.on('addedAGroup', async (rooms: Room[]) => {
      this.rooms = rooms;
      this.roomsChanged.next(rooms);
    });
  }


}
