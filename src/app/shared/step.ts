import { User } from "./user";

export class Step {

     constructor(public description: string,
        public done: User[] = [],
        public stuck: User[] = [],
        public working: User[] = []) {

    }
}