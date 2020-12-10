import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../entities/user.entity';
import { Repository } from 'typeorm';
var crypto = require('crypto');

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async getProfile(id) {
        var user: User = await this.usersRepository.findOne(id);
        if (!user) {
            throw new HttpException("User not found!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            "firstname": user.firstName,
            "lastname": user.lastName
        }
    }
}