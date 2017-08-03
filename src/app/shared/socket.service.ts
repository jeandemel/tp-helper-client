import {TP} from './tp';
import { Help } from './help';
import { User } from './user';
import * as io from 'socket.io-client';
import { Injectable, } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/share';

import { Subject } from "rxjs/Subject";
import { TpProgress } from "./tp-progress";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class SocketService {

    private serverUrl: string = 'http://localhost:3000';
    public socket: SocketIOClient.Socket;
    public user: User;
    public helpList$: Observable<Help[]> = new Observable();
    public activeTp$: Observable<TP> = new Observable();
    public socket$: BehaviorSubject<SocketIOClient.Socket> = new BehaviorSubject(null);
    public user$: Observable<User>;
    public progress$:Observable<TpProgress[]>;
    public userList$:Observable<User[]>;

    constructor() {
        this.init();
    }


    login(mail: string, pass: string) {
        this.socket = io.connect(this.serverUrl, { query: 'mail=' + mail + '&pass=' + pass });
        this.socket$.next(this.socket);
        // return this.socket$;
        // return Observable.fromEvent(this.socket, 'authenticate').map((response: { status: boolean, data: User }) => {
        //     if (response.status) {
        //         this.user = response.data;
        //         this.socket.emit('active-tp');
        //         this.init();
        //         this.initialized.next(true);
        //         return true;
        //     }else {
        //         this.initialized.next(false);
        //         return false;
        //     }
        // });
    }

    init() {
        this.socket$.skipWhile(val => val ===null).mergeMap((socket) => Observable.fromEvent(socket, 'authenticate'))
            .map((response: { status: boolean, data: User }) => response.data).subscribe((user) => this.user = user);

        this.helpList$ = this.socket$.skipWhile(val => val ===null).mergeMap((socket) => Observable.fromEvent(socket, 'help-list-response'))
            .map((response: { data: Help[], status: boolean }) => response.data);
        this.progress$ = this.socket$.skipWhile(val => val ===null).mergeMap((socket) => Observable.fromEvent(socket, 'tp-progress-response'))
            .map((response: { data: TpProgress[], status: boolean }) => response.data);
        this.activeTp$ = this.socket$.skipWhile(val => val ===null).do((socket) => socket.emit('active-tp'))
            .mergeMap((socket) => Observable.fromEvent(socket, 'active-tp-response'))
            .map((response: { data: TP, status: boolean }) => response.data);
        this.userList$ = this.socket$.skipWhile(val => val ===null).do((socket) => socket.emit('user-list'))
            .mergeMap((socket) => Observable.fromEvent(socket, 'user-list-response'))
            .map((response: { data: User[], status: boolean }) => response.data);

    }

    getHelpList() {
        this.socket.emit('help-list');
    }

    delHelp(help: Help) {
        this.socket.emit('help-success', help);
    }

    addHelp(subject: string) {
        this.socket.emit('help-request', subject);
    }

    changeProgress(tpProgress:TpProgress) {
        this.socket.emit('change-progress', tpProgress);
    }

    startTp(tp:TP){
        this.socket.emit('start-tp', tp);
    }

    modifyTp(tp:TP) {
        this.socket.emit('modify-tp', tp);
    }
}