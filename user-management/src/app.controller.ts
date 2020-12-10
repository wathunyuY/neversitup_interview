import { Controller, Logger, Post, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './services/users.service';
// import { UsersService } from './services/users.service';

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  constructor(
    private userServie: UsersService
  ) {}
  
  @MessagePattern('getProfile')
  async accumulate(id: number)  {
    return this.userServie.getProfile(id); 
  }

}
