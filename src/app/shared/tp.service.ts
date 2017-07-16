import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/concatMap';
import {TP} from './tp';
import {Step} from './step';
import { Subject } from "rxjs/Subject";

@Injectable()
export class TpService {
    
    private $fixture:Subject<TP>;

    constructor() {
        this.$fixture = new Subject();
        this.$fixture.next(new TP('TP 1', [new Step('étape 1.1'), new Step('étape 2.1')], new Date()));
        this.$fixture.next(new TP('TP 2', [new Step('étape 1.2'), new Step('étape 2.2')], new Date()));
        this.$fixture.next(new TP('TP 3', [new Step('étape 1.3'), new Step('étape 2.3')], new Date()));
      
    }

    getAllTps():Observable<TP> {
        return this.$fixture;
    }

    getLastTp():Observable<TP>{
        return this.$fixture.last();
    }

    addTp(tp:TP):void {
        this.$fixture.next(tp);
    }
}