import { HttpException, Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserManageMentService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: 'nvs_user',
                port: 8878,
            },
        });
    }

    public accumulate(data: number[]) {
        return this.client.send<number, number[]>('add', data);
    }

    /**
     * getProfile
     */
    public getProfile(id:number) {
        return this.client.send<any, any>('getProfile', id);
    }
}
