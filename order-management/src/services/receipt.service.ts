import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Like, Repository } from 'typeorm';
import { Receipt, ReceiptStatus } from 'src/entities/receipt.entity';
import { Order } from './../entities/order.entity';
import { Product } from './../entities/product.entity';
var crypto = require('crypto');

@Injectable()
export class ReceiptService {
    constructor(
        @InjectRepository(Receipt)
        private receiptRepository: Repository<Receipt>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private connection: Connection

    ) { }


    public async createReceipt(data, payload) {
        if (!data.orders || !data.orders.length) {
            throw new HttpException(`Orders is empty`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        var products: Product[] = await this.productRepository.findByIds(data.orders.map(p => p.product_id));
        if (products.length !== data.orders.length) {
            throw new HttpException(`Some product not match`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        var receipt: Receipt = new Receipt();
        receipt.code = `PR${payload.id}${(new Date()).getTime()}`;
        receipt.user = payload.id;
        receipt.status = ReceiptStatus.Pending;

        var newReceipt: Receipt = await this.receiptRepository.save(receipt);
        products.map(async p => {
            var req_product = data.orders.find(f => f.product_id == p.id);
            var order: Order = new Order();
            order.product = p,
                order.receipt = newReceipt,
                order.price = p.price,
                order.count = req_product.count;
            order.discount = req_product.discount;
            await this.orderRepository.save(order);

        })
        return true;
    }

    public async getReceipt(user_id) {
        try {
            const queryRunner = this.connection.createQueryRunner();
            await queryRunner.connect();
            var results = await queryRunner.manager.query("SELECT r.id as receiptId,r.code,r.createDate,r.status , o.price , o.count,o.discount,p.name as product_name FROM `receipt` r INNER JOIN `order` o ON o.receiptId = r.id INNER JOIN `product` p ON o.productId = p.id WHERE r.userId = ?", [user_id]);
            const groupBy = (array, key) => {
                return array.reduce((result, currentValue) => {
                    (result[currentValue[key]] = result[currentValue[key]] || []).push(
                        currentValue
                    );
                    return result;
                }, {});
            };
            var i = 0;
            return groupBy(results, 'receiptId');
        }
        catch (e) {
            throw new HttpException(`Get orders fail`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getReceiptById(user_id, receipt_id) {
        try {
            const queryRunner = this.connection.createQueryRunner();
            await queryRunner.connect();
            var results = await queryRunner.manager.query("SELECT r.id as receiptId,r.code,r.createDate,r.status , o.price , o.count,o.discount,p.name as product_name FROM `receipt` r INNER JOIN `order` o ON o.receiptId = r.id INNER JOIN `product` p ON o.productId = p.id WHERE r.userId = ? and r.id =?", [user_id,receipt_id]);
            const groupBy = (array, key) => {
                return array.reduce((result, currentValue) => {
                    (result[currentValue[key]] = result[currentValue[key]] || []).push(
                        currentValue
                    );
                    return result;
                }, {});
            };
            var i = 0;
            return groupBy(results, 'receiptId');
        }
        catch (e) {
            throw new HttpException(`Get orders fail`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async cancelReceipt(user_id, receipt_id) {
        try {
            var receipt: Receipt = await this.receiptRepository.findOne({
                id: receipt_id,
                user: user_id
            });
            if (!receipt) {
                throw new HttpException(`Order not found!`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            receipt.status = ReceiptStatus.Cancel;
            await this.receiptRepository.update(receipt_id, receipt);
            return true;
        } catch (e) {
            throw new HttpException(`Cancel fail`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}