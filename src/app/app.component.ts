import {TP} from './shared/tp';
import { Component, OnInit } from '@angular/core';
import { SocketService } from "./shared/socket.service";
import { Observable } from "rxjs/Observable";

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
  private sockInit:boolean = false;
  private activeTp:TP = undefined;

  constructor(private socketService:SocketService,){}

  ngOnInit(): void {
    this.socketService.activeTp$.subscribe((tp) => this.activeTp = tp);

  }

}