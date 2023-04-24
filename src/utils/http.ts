enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}
type Options = {
    retries?: number,
    timeout?: number,
    headers?: { [key: string]: unknown },
    method?: METHODS,
    data?: any
}

const queryStringify = (data: { [key: string]: unknown }) => {
    let str = ''

    const keys = Object.keys(data)
    keys.map(key => str += '&' + key + '=' + data[key])
    return '?' + str.substr(1)
}

export class HTTPTransport{
    private base_url = "https://ya-praktikum.tech/api/v2";
    handle: string = ''
    constructor(handle_: string =''){
        this.handle = this.base_url+handle_
    }
    get = (url: string, options: Options = {}):Promise<Response> => {

        return this.request(this.handle+url, { ...options, method: METHODS.GET }, options.timeout);
    };
    put = (url: string, options: Options = {}):Promise<Response> => {

        return this.request(this.handle+url, { ...options, method: METHODS.PUT }, options.timeout);
    };
    post = (url: string, options: Options = {}):Promise<Response> => {

        return this.request(this.handle+url, { ...options, method: METHODS.POST }, options.timeout);
    };
    delete = (url: string, options: Options = {}):Promise<Response> => {

        return this.request(this.handle+url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    request = (url: string, options: Options = {}, timeout = 5000):Promise<Response> => {
        const { method, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (method === METHODS.GET && data) {
                url += queryStringify(data)
            }

            xhr.open(method ? method : METHODS.GET, url);
            xhr.timeout = timeout
            xhr.onload = function () {
                resolve(xhr.response);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.withCredentials = true;
            xhr.responseType = 'json';
            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data instanceof FormData ? data : JSON.stringify(data));
            }
        });

    };
}
const myFetch = new HTTPTransport

export function fetchWithRetry(url: string, options: Options): any {
    const { retries = 1 } = options
    console.log(retries)

    function onError(err: DOMException) {
        const retriesLeft = retries - 1
        if (retriesLeft <= 0) {
            throw err
        }
        return fetchWithRetry(url, { ...options, retries: retriesLeft })
    }

    return myFetch.request(url, options).catch(onError)
}

