import { HttpException, Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthenticationService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 8877,
            },
        });
    }
    public register(data) {
        return this.client.send<any, any>('register', data);
    }
    public login(data) {
        return this.client.send<any, any>('login', data);
    }
    /**
     * validate
     */
    public validate(token) {
        return this.client.send<any, any>('validate', token);
    }
}
