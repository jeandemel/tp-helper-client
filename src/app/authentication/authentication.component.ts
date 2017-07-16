import { Component, Input } from '@angular/core';
import { SocketService } from "../shared/socket.service";




@Component({
    selector: 'authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
    @Input()
    private email:string;
    @Input()
    private pass:string;
    private msg:string;

    constructor(private socketService:SocketService){}


    login() {
        this.socketService.login(this.email, this.pass).subscribe((logged) => {
            console.log(logged);
            if(!logged) {
                this.msg = 'Erreur d\'authentification';
            }else {
                this.msg = '';
            }
        });
    }

}