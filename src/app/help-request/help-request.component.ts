import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocketService } from "../shared/socket.service";
import { Help } from "../shared/help";
import { Observable } from "rxjs/Observable";
import { User } from "../shared/user";




@Component({
    selector: 'help-request',
    templateUrl: './help-request.component.html',
    styleUrls: ['./help-request.component.css']
})
export class HelpRequestComponent implements OnInit {
    private helps:Observable<Help[]>;
    private user:User;
    @Input()
    private subject:string = '';
    constructor(private socketService: SocketService) { }

    ngOnInit(): void {
        this.socketService.getHelpList();
        this.helps = this.socketService.helpList$;
        this.user = this.socketService.user;

    }

    done(help:Help) {
        this.socketService.delHelp(help);
    }

    addHelp() {
        this.socketService.addHelp(this.subject);
        this.subject = '';
    }


}