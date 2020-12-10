
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './schemas/user.schema';
import { ProductSchema } from './schemas/product.schema';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            autoLoadEntities: true,
        }),
        TypeOrmModule.forFeature([UserSchema,ProductSchema])
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule { }