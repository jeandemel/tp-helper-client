import {TP} from './tp';
import {Help} from './help';
import { User } from './user';
import * as io from 'socket.io-client';
import { Injectable,  } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class SocketService  {
    
    private serverUrl: string = 'http://localhost:3000';
    public socket: SocketIOClient.Socket;
    public user: User;
    public initialized: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public helpList$: Observable<Help[]> = new Observable();
    public activeTp$: Observable<TP> = new Observable();


    login(mail: string, pass: string):Observable<boolean> {
        this.socket = io.connect(this.serverUrl, { query: 'mail=' + mail + '&pass=' + pass });

        return Observable.fromEvent(this.socket, 'authenticate').map((response: { status: boolean, data: User }) => {
            if (response.status) {
                this.user = response.data;
                this.socket.emit('active-tp');
                this.init();
                this.initialized.next(true);
                return true;
            }else {
                this.initialized.next(false);
                return false;
            }
        });
    }

    init() {
        this.helpList$ = Observable.fromEvent(this.socket, 'help-list-response').map((response:{data:Help[], status:boolean}) => response.data);
        this.activeTp$ = Observable.fromEvent(this.socket, 'active-tp-response').map((response:{data:TP, status:boolean}) => response.data);
    }

    getHelpList() {
        this.socket.emit('help-list');
    }

    delHelp(help:Help) {
        this.socket.emit('help-success', help);
    }

    addHelp(subject:string) {
        this.socket.emit('help-request', subject);
    }
}