import {TP} from '../shared/tp';
import {OnInit, Component} from '@angular/core';
import {TpService} from '../shared/tp.service';
import { Step } from "../shared/step";

@Component({
    selector: 'current-tp',
    templateUrl: './current-tp.component.html'
})
export class CurrentTpComponent implements OnInit {
    currentTp: TP;

    constructor(private tpService: TpService){}

    ngOnInit() {
        
        this.tpService.getLastTp().subscribe(tp => this.currentTp = tp);
    }

    add() {
        this.tpService.addTp(new TP('test', [new Step('etape test')], new Date()));
    }

}