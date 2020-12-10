import { Controller, Logger, Post, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './services/product.service';

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  constructor(
    private productServie: ProductService
  ) {}
  
  @MessagePattern('getProduct')
  async getProduct(id: number)  {
    return this.productServie.getProduct(id); 
  }

  @MessagePattern('findProduct')
  async findProduct(key: string)  {
    return this.productServie.findProduct(key); 
  }

}
