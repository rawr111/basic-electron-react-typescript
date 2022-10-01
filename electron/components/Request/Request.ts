import request, { RequestAPI, Request, CoreOptions, RequiredUriUrl, Options, Response, UriOptions, UrlOptions } from 'request';
import ProxyInterface from './ProxyInterface';

class RequestPromise {
    id: string;
    object: RequestAPI<Request, CoreOptions, RequiredUriUrl>;

    constructor(proxy: ProxyInterface | null | undefined) {
        this.id = "432"; 
        if (proxy) {
            this.object = request.defaults({ proxy: `http://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`, timeout: 3000 });
        } else {
            this.object = request;
        }
    }

    send(options: request.RequiredUriUrl & request.CoreOptions): Promise<{ response: Response, body: any }> {
        return new Promise((resolve, reject) => {
            this.object(options, (err: any, response: any, body: any) => {
                if (err) {
                    reject(err);
                }
                resolve({ response, body });
            });
        });
    }

    async getMyIp(): Promise<string> {
        const { body, response } = await this.send({ url: 'http://ip-api.com/json' });
        const data = JSON.parse(body);
        if (!body || response.statusCode !== 200 || !data.query || data.status !== 'success'){
            throw new Error('Не удалось получить ip! body: ' + body);
        }
        return `${data.query} country: ${data.country}; city: ${data.city}; timezone: ${data.timezone};`;
    }
}

export default RequestPromise;