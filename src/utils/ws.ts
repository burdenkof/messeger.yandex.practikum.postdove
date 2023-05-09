import EventBus from "./event-bus"

export enum WebSocketEvents {
    connected = 'connected',
    close_ = 'close',
    message = 'message'
}

export default class WebSocketTransport {

    private ws: WebSocket | null = null
    public bus: EventBus
    private url: string = ''
    private pingInterval: any = -1
    constructor(url: string) {
        this.url = url
        this.bus = new EventBus
    }

    connect(): Promise<void> {

        this.ws = new WebSocket(this.url)


        this.ws.addEventListener('open', () => {
            this.bus.emit(WebSocketEvents.connected);
        })
        this.ws.addEventListener('close', () => {
            this.bus.emit(WebSocketEvents.close_);
        })

        this.ws.addEventListener('message', (data) => {

            const message = JSON.parse(data.data)
            if (message.type !== undefined && message.type == 'pong') {
                return
            }
            this.bus.emit(WebSocketEvents.message, data)




        })


        this.pingInterval = setInterval(() => {
            this.send({ type: 'ping' });
        }, 5000)


        this.bus.on(WebSocketEvents.close_, () => {
            clearInterval(this.pingInterval)
        })


        return new Promise<void>((resolve) => {
            this.bus.on(WebSocketEvents.connected, () => {
                resolve()
            })
        })
    }
    public send(data: unknown) {
        if (!this.ws) {
            return
        }


        this.ws.send(JSON.stringify(data))

    }

}