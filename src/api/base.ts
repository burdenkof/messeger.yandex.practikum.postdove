import {HTTPTransport} from '../utils/http';

export abstract class BaseAPI {
    protected http: HTTPTransport;

    protected constructor(handle: string) {
        this.http = new HTTPTransport(handle);
    }

    public abstract create?(data: unknown): Promise<unknown>;

    public abstract read?(identifier?: string): Promise<unknown>;

    public abstract update?(data: unknown): Promise<unknown>;

    public abstract delete?(identifier: string | number): Promise<unknown>;
}