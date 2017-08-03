import { User } from "./user";

export class Step {

     constructor(public description: string,
        public done: User[] = [],
        public stuck: User[] = [],
        public working: User[] = []) {

    }

    userProgress(user:User) {
        if(this.done.findIndex((us) => us._id === user._id)){
            return 0;
        }
        if(this.stuck.findIndex((us) => us._id === user._id)) {
            return 1;
        }
        if(this.working.findIndex((us) => us._id === user._id)) {
            return 2;
        }
        return -1;
    }
}