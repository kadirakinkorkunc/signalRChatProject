import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { DataTransferService } from '../services/data-transfer.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConnectionHubService } from '../services/connection-hub.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  hubCon: HubConnection;
  options: FormGroup;
  constructor(private dataTransfer: DataTransferService,
              private activatedRoute: ActivatedRoute,
              private hubConService: ConnectionHubService,
              fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  userName = '';
  message = '';
  groupName = '';
  messages: string[] = [];
  roomId: any;

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.roomId = this.activatedRoute.snapshot.params['roomId'];
    this.groupName = 'Chatroom ' + this.roomId;


    this.hubConService.hubConnection
      .invoke('JoinToAGroup', this.userName, this.message, this.groupName)
      .catch(err => console.log('joinTheRoom tetiklenirken hata :', err));

    // server tarafından gelecek uyarıları dinleyen listenerlar
    this.hubConService.hubConnection.on('joinedToGroup', async (username, groupName) => {
      const text = username + ' joined ' + groupName;
      console.log(text);
      this.messages.push(text);
    });

    this.hubConService.hubConnection.on('messagedToGroup', async (username, receivedMessage) => {
      const text = username + ': ' + receivedMessage;
      this.messages.push(text);

    });

    this.hubConService.hubConnection.on('leftFromGroup', async (username, groupName) => {
      const text = username + ' has left' + groupName;
      console.log(text);
      this.messages.push(text);
    });




  }

  // butonlara basılınca server tarafını uyarıcak fonksiyonlar
  sendMessage() {
    this.hubConService.hubConnection
      .invoke('SendToAGroup', this.userName, this.message, this.groupName)
      .catch(err => console.log('send msg tetiklenirken hata :', err));

  }

  leftTheRoom() {
    this.hubConService.hubConnection
      .invoke('LeaveFromGroup', this.userName, this.groupName)
      .catch(err => console.log('lefttheroom tetiklenirken hata :', err));
  }
  // butonlara basılınca server tarafını uyarıcak fonksiyonlar

}
