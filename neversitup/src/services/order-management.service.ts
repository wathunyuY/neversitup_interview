import { HttpException, Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderManageMentService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 8880,
            },
        });
    }

     /**
     * createReceipt
     */
    public createReceipt(data,payload) {
        return this.client.send<any, any>('createReceipt', {data,payload});
    }
    /**
     * getReceipt
     */
    public getReceipt(user_id) {
        return this.client.send<any, any>('getReceipt', user_id);
    }

    /**
     * cancelReceipt
     */
    public cancelReceipt(user_id,receipt_id) {
        return this.client.send<any, any>('cancelReceipt', {user_id,receipt_id});
    }
    
    /**
     * cancelReceipt
     */
    public getReceiptById(user_id,receipt_id) {
        return this.client.send<any, any>('getReceiptById', {user_id,receipt_id});
    }
}
