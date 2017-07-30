import {SocketService} from '../shared/socket.service';
import {TP} from '../shared/tp';
import {OnInit, Component} from '@angular/core';
import { Step } from "../shared/step";

@Component({
    selector: 'current-tp',
    templateUrl: './current-tp.component.html'
})
export class CurrentTpComponent implements OnInit {
    currentTp: TP;

    constructor(private socketService:SocketService){}

    ngOnInit() {
        
        this.socketService.activeTp$.subscribe(tp => this.currentTp = tp);
    }

    add() {
        // this.socketService.addTp(new TP('test', [new Step('etape test')], new Date()));
    }

}