import {SocketService} from '../shared/socket.service';
import {TP} from '../shared/tp';
import { OnInit, Component, Input } from '@angular/core';
import { Step } from "../shared/step";
import { TpProgress } from "../shared/tp-progress";

@Component({
    selector: 'current-tp',
    templateUrl: './current-tp.component.html',
    styleUrls: ['./current-tp.component.css']
})
export class CurrentTpComponent implements OnInit {
    @Input()
    currentTp: TP;
    @Input()
    tpProgress:TpProgress[];
    myProgress:TpProgress;

    progress: number[] = [];

    constructor(private socketService:SocketService){}

    ngOnInit() {
        let prog = this.tpProgress.find((progress) => progress.userId === this.socketService.user._id);
        if(typeof(prog) === 'undefined') {
            this.myProgress = new TpProgress(this.socketService.user._id, this.currentTp._id, []);
        }else{
            this.myProgress = prog;
        }
    }

    changeProgress() {
        this.socketService.changeProgress(this.myProgress);
    }

}