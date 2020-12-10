import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) { }

    async login(user: any) {
        const payload = { username: user.username, oprid: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    public async verify(token){
        return this.jwtService.verify(token);
    }
}