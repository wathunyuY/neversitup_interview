
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './schemas/user.schema';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            autoLoadEntities: true,
        }),
        TypeOrmModule.forFeature([UserSchema])
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule { }