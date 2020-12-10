import { Controller, Logger, Post, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ReceiptService } from './services/receipt.service';

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  constructor(
    private receiptService:ReceiptService
  ) {}
  
  @MessagePattern('createReceipt')
  async createReceipt(data)  {
    return this.receiptService.createReceipt(data.data,data.payload); 
  }
  @MessagePattern('getReceipt')
  async getReceipt(user_id)  {
    return await this.receiptService.getReceipt(user_id); 
  }

  @MessagePattern('getReceiptById')
  async getReceiptById(data)  {
    return await this.receiptService.getReceiptById(data.user_id,data.receipt_id); 
  }

  @MessagePattern('cancelReceipt')
  async cancelReceipt(data)  {
    return await this.receiptService.cancelReceipt(data.user_id,data.receipt_id); 
  }

}
