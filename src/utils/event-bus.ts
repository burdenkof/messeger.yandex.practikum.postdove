 
  export interface Listener {
    [key: string]: Array<Function>
  }
export class EventBus {
    public listeners: Listener;
    private static instance?: EventBus = undefined

    constructor() {
        if (EventBus.instance === undefined) {
            EventBus.instance = new EventBus()
          
            EventBus.instance.listeners = {}
          return EventBus.instance
        }
        
        return EventBus.instance
    }
  
    on(event:string, callback:Function) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
  
      this.listeners[event].push(callback);
    }
  
    off(event:string, callback:Function) {
          if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }
  
      this.listeners[event] = this.listeners[event].filter(
        listener => listener !== callback
      );
    }
  
    emit(event:string, ...args: unknown[]) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }
      
      this.listeners[event].forEach(function(listener) {
        listener(...args);
      });
    }
  }