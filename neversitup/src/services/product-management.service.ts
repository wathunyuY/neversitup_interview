import { HttpException, Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductManageMentService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: 'nvs_product',
                port: 8879,
            },
        });
    }
    /**
     * getProduct
     */
    public getProduct(id: number) {
        return this.client.send<any, any>('getProduct', id);
    }
    /**
     * findProduct
     */
    public findProduct(keyword: string) {
        return this.client.send<any, any>('findProduct', keyword ? keyword : "");
    }
}
