import { Product } from '../entities/product.entity';
import { EntitySchema } from 'typeorm';

export const ProductSchema = new EntitySchema<Product>({
    name: 'Product',
    target: Product,
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        name: {
            type: String,
        },
        descr: {
            type: String,
        },
        price: {
            type: Number,
        },
        img: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    relations: {
        orders: {
            type: 'one-to-many',
            target: 'order'
        }
    },
});