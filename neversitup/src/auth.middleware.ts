import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class ProfileMiddleware implements NestMiddleware {
  constructor(
    private readonly authenticationService:AuthenticationService,

  ){}
  async use(req: Request, res: Response, next: Function) {
    var auth = await this.authenticationService.validate(req.headers.authorization).toPromise();
    if(!auth){
      throw new HttpException("Auth fail", HttpStatus.UNAUTHORIZED);
    }
    req["payload"] = auth ;
    next();
  }
}
