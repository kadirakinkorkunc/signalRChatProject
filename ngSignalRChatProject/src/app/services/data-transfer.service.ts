import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HubConnection } from '@aspnet/signalr';
import { ConnectionHubService } from './connection-hub.service';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  onDataSent: Subject<any> = new Subject();

  constructor() { }

  sendData(data: any) {
    this.onDataSent.next(data);
  }
}
