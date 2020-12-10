import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
var crypto = require('crypto');

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private authenService: AuthService
    ) { }

    async register(data) {
        if (!data || !data.username || !data.password) {
            throw new HttpException(`Missing params`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (data.password !== data.confirm_password) {
            throw new HttpException(`Password not match`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        var existUser: User = await this.usersRepository.findOne({ username: data.username });
        if (existUser) {
            throw new HttpException(`Existing user`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        var user: User = new User();
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.username = data.username;
        user.password = crypto.createHash('sha512').update(data.password).digest('hex');
        var newUser: User = await this.usersRepository.save(user);
        return await this.authenService.login({
            username: newUser.username,
            id: newUser.id
        });
    }

    public async login(data) {
        if (!data || !data.username || !data.password) {
            throw new HttpException(`Missing params`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        var user: User = await this.usersRepository.findOne({
            username: data.username,
            password: crypto.createHash('sha512').update(data.password).digest('hex')
        });
        if (!user) {
            throw new HttpException(`Login fail`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return await this.authenService.login({
            username: user.username,
            id: user.id
        })
    }

    public async userValidate(token) {
        try {
            var payload = await this.authenService.verify(token);
            if(!payload) return false;
            var user:User = await this.usersRepository.findOne(payload.oprid);
            if(!user) return false;
            return{
                firstName:user.firstName,
                lastName:user.lastName,
                id:user.id
            }
        } catch (e) {
            return false;
        }
    }

}