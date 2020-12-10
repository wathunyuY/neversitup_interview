import { Controller, Logger, Post, Body, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './services/users.service';

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  constructor(
    private userServie: UsersService
  ) {}

  @MessagePattern('register')
  async register(data:any)  {
    try{
    return await this.userServie.register(data);
    }catch(e){
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } 
  }

  @MessagePattern('login')
  async login(data:any)  {
    return await this.userServie.login(data); 
  }

  @MessagePattern('validate')
  async validate(@Body('token') token)  {
    return await this.userServie.userValidate(token);
  }
}
