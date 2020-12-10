import { Controller, Logger, Post, Body, Get, Param, Request, Query, Put } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { OrderManageMentService } from './services/order-management.service';
import { ProductManageMentService } from './services/product-management.service';
import { UserManageMentService } from './services/user-management.service';

@Controller('order')
export class OrderController {
  private logger = new Logger('OrderController');

  constructor(
    private orderManagemantService:OrderManageMentService,
  ) { }

  @Post()
  async receipt(@Request() req,@Body('data') data) {
    return this.orderManagemantService.createReceipt(data,req.payload);
  }
  @Get()
  async getReceipt(@Request() req) {
    return this.orderManagemantService.getReceipt(req.payload.id);
  }
  @Get(':id')
  async getReceiptById(@Request() req,@Param('id') id) {
    return this.orderManagemantService.getReceiptById(req.payload.id,id);
  }
  @Put('cancel/:id')
  async cancelReceipt(@Request() req,@Param('id') id) {
    return this.orderManagemantService.cancelReceipt(req.payload.id,id);
  }
}
