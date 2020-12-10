import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { DatabaseModule } from './database.module';
import { ProductService } from './services/product.service';
@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [ProductService]
})
export class AppModule {
  constructor() { }
}
