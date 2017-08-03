import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from "../shared/socket.service";




@Component({
    selector: 'authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
    
    @Input()
    private email:string;
    @Input()
    private pass:string;
    private msg:string;

    constructor(private socketService:SocketService){}

    ngOnInit(): void {
        // this.socketService.user$.subscribe((data) => {
        //     if(typeof(data) !== 'object') {
        //         this.msg = data;
        //     } else {
        //         this.msg = '';
        //     }
        // });
    }

    login() {
        this.socketService.login(this.email, this.pass);
    }

}