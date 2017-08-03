import {User} from './shared/user';
import {TP} from './shared/tp';
import { Component, OnInit } from '@angular/core';
import { SocketService } from "./shared/socket.service";
import { Observable } from "rxjs/Observable";
import { TpProgress } from "./shared/tp-progress";
import 'rxjs/add/observable/zip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    providers: [
      SocketService
    ]
})
export class AppComponent implements OnInit {
  public readonly name = 'Tp / Helper';
  private activeTp:TP = undefined;
  private progress:TpProgress[];
  private user:User;

  constructor(private socketService:SocketService,){}

  ngOnInit(): void {
    Observable.zip(this.socketService.activeTp$, this.socketService.progress$)
    .subscribe(([tp, prog]) => {
      this.activeTp = tp;
      this.progress = prog;
      this.user = this.socketService.user;
    });
    

  }

}