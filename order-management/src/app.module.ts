import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { DatabaseModule } from './database.module';
import { ReceiptService } from './services/receipt.service';
@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [ReceiptService]
})
export class AppModule {
  constructor() { }
}
