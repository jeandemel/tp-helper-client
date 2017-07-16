import { Component, OnInit } from '@angular/core';
import { SocketService } from "./shared/socket.service";
import { TpService } from "./shared/tp.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    providers: [
      TpService, 
      SocketService
    ]
})
export class AppComponent implements OnInit {
  public readonly name = 'Tp / Helper';
  private sockInit:boolean = false;

  constructor(private socketService:SocketService,){}

  ngOnInit(): void {
    this.socketService.initialized.subscribe((init) => {
      this.sockInit = init;
    });

  }

}