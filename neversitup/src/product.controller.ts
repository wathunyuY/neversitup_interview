import { Controller, Logger, Post, Body, Get, Param, Request, Query } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { ProductManageMentService } from './services/product-management.service';
import { UserManageMentService } from './services/user-management.service';

@Controller('product')
export class ProductController {
  private logger = new Logger('ProductController');

  constructor(
    private productManagementService:ProductManageMentService,
    private userManagementService: UserManageMentService
  ) { }

  @Get(':id')
  async product(@Request() req,@Param('id') id) {
    return this.productManagementService.getProduct(id);
  }
  @Get('')
  async findProduct(@Request() req,@Query('keyword') keyword) {
    return this.productManagementService.findProduct(keyword);
  }
}
