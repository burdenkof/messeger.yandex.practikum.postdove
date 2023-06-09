import EventBus from "./event-bus";
import {set} from "./functions"
export enum StoreEvents {
    Updated = 'updated'
}

export class Store extends EventBus {
    private state: any = {};

    public set(keypath: string, data: unknown) {
        set(this.state, keypath, data);

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }

    public clear() {
        this.state = {};
    }
}

export const store: Store = new Store();