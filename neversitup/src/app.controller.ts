import { Controller, Logger, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  @Post('register')
  async register(@Body('data') data) {
    try {
      return this.authenticationService.register(data); 
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post('login')
  async login(@Body('data') data) {
    try {
      return this.authenticationService.login(data);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
