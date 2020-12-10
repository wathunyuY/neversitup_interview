
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './schemas/user.schema';
import { ProductSchema } from './schemas/product.schema';
import { ReceiptSchema } from './schemas/receipt.schema';
import { OrderSchema } from './schemas/order.schema';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            autoLoadEntities: true,
        }),
        TypeOrmModule.forFeature([UserSchema,ProductSchema,ReceiptSchema,OrderSchema])
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule { }