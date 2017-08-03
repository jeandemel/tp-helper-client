import {User} from '../../shared/user';
import {TpProgress} from '../../shared/tp-progress';
import { TP } from '../../shared/tp';
import { SocketService } from '../../shared/socket.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tp-manager',
  templateUrl: './tp-manager.component.html',
  styleUrls: ['./tp-manager.component.css']
})
export class TpManagerComponent implements OnInit {
  private currentTp: TP;
  private progresses:TpProgress[] = [];
  private users:User[] = [];
  @Input()
  private newStep: string;
  private chipColor: string[];

  constructor(private socketService: SocketService) {
    this.currentTp = new TP('');
    this.chipColor = [
      'yellow',
      'red',
      'green'
    ];
  }

  ngOnInit() {
    this.socketService.activeTp$.subscribe((tp) => {
      if (tp !== null) {
        this.currentTp = tp;
      }
    });
    
    this.socketService.progress$.subscribe((prog) => {
        this.progresses = prog;        
    });
    this.socketService.userList$.subscribe((users) => {
        this.users = users;        
    });

  }

  getUserName(id) {
    let user = this.users.find((user) => user._id === id);
    if(user) {
      return user.pseudo
    }
    return 'Inexistant';
  }

  addStep() {
    this.currentTp.steps.push(this.newStep);
    this.newStep = '';
  }

  removeStep(index:number) {
    this.currentTp.steps.splice(index, 1);
    for(let progress of this.progresses) {
      progress.state.splice(index,1);
    }
  }

  apply() {
    if (typeof (this.currentTp._id) === 'undefined') {
      this.socketService.startTp(this.currentTp);
    } else {
      this.socketService.modifyTp(this.currentTp);
    }
  }

  trackIndex(index: number, obj: any): any {
    return index;
  }

}
