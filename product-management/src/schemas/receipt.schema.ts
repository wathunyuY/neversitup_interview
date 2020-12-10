import { Receipt,ReceiptStatus } from 'src/entities/receipt.entity';
import { EntitySchema } from 'typeorm';

export const ReceiptSchema = new EntitySchema<Receipt>({
    name: 'Receipt',
    target: Receipt,
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        code: {
            type: String,
        },
        createDate: {
            type: Date,
        },
        status: {
            type: String,
            enum:ReceiptStatus
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    relations: {
        orders: {
            type: 'one-to-many',
            target: 'Order', // the name of the Schema
        },
        user: {
            type: 'many-to-one',
            target: 'User'
        }
    },
});