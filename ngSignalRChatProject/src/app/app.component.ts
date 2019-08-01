import { Component, OnInit } from '@angular/core';
import { ConnectionHubService } from './services/connection-hub.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngSignalRChatProject';

  constructor(private conHubService: ConnectionHubService,
              private activatedRoute: ActivatedRoute) {

  }
  ngOnInit() {
    this.conHubService
      .createAndConnect()
      .catch(err => {
        console.log('err when app.comp trying to start hub con: ', err);
      });

    }
      checkForDisable(): boolean {
        if (this.activatedRoute.snapshot.children.length === 0) {
          return false;
        } else {
          return true;
        }
      }

}
