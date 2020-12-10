import { Order } from 'src/entities/order.entity';
import { EntitySchema } from 'typeorm';

export const OrderSchema = new EntitySchema<Order>({
    name: 'Order',
    target: Order,
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        price: {
            type: Number,
        },
        count: {
            type: Number,
        },
        discount: {
            type: Number,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    relations: {
        product: {
            type: 'many-to-one',
            target: 'Product', // the name of the Schema
        },
        receipt: {
            type: 'many-to-one',
            target: 'Receipt'
        }
    },
});