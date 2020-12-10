import { Controller, Logger, Post, Body, Get, Param, Request } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { UserManageMentService } from './services/user-management.service';

@Controller('profile')
export class ProfileController {
  private logger = new Logger('ProfileController');

  constructor(
    private authenticationService:AuthenticationService,
    private userManagementService: UserManageMentService
  ) { }

  @Get('/')
  async profile(@Request() req) {
    return this.userManagementService.getProfile(req.payload.id); 
  }
}
