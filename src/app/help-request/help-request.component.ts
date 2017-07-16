import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocketService } from "../shared/socket.service";
import { Help } from "../shared/help";
import { Observable } from "rxjs/Observable";




@Component({
    selector: 'help-request',
    templateUrl: './help-request.component.html',
    styleUrls: ['./help-request.component.css']
})
export class HelpRequestComponent implements OnInit {
    private helps:Observable<Help[]>;
    constructor(private socketService: SocketService) { }

    ngOnInit(): void {
        this.socketService.getHelpList();
         this.helps = this.socketService.helpList$;

    }


}