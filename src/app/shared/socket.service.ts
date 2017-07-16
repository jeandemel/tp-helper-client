import {Help} from './help';
import { User } from './user';
import * as io from 'socket.io-client';
import { Injectable,  } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class SocketService  {
    
    private serverUrl: string = 'http://localhost:3000';
    public socket: SocketIOClient.Socket;
    public user: User;
    public initialized: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public helpList$: Observable<any>;


    login(mail: string, pass: string):Observable<boolean> {
        this.socket = io.connect(this.serverUrl, { query: 'mail=' + mail + '&pass=' + pass });

        return Observable.fromEvent(this.socket, 'authenticate').map((response: { status: boolean, data: User }) => {
            if (response.status) {
                this.user = response.data;
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
        let helpRequest$:Observable<{data:Help, status:boolean}> = <any>Observable.fromEvent(this.socket, 'help-request-response').startWith({status:false, data:null});
        let helpSuccess$:Observable<{data:Help, status:boolean}> = <any>Observable.fromEvent(this.socket, 'help-success-response').startWith({status:false, data:null});
        let help$:Observable<{data:Help[], status:boolean}> = Observable.fromEvent(this.socket, 'help-list-response');
        this.helpList$ = Observable.combineLatest(help$, helpRequest$, helpSuccess$)
            .map(([toList,toAdd,toDel]) => {
                let list = [];
                if(toList.status) {
                    list = toList.data;
                }
                if(toAdd.status) {
                    list.push(toAdd.data);
                }
                if(toDel.status) {
                    list = list.filter((item:Help) => item._id !== toDel.data._id);
                }

                return list;
            });

    }

    getHelpList() {
        this.socket.emit('help-list');
    }
}