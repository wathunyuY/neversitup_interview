import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Like, Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
var crypto = require('crypto');

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private usersRepository: Repository<Product>,
    ) {}

    async getProduct(id) {
        return await this.usersRepository.findOne(id);
    }
    async findProduct(keyword) {
        return await this.usersRepository.find({
            where: [
                {name: Like(`%${keyword}%`)},
                {descr: Like(`%${keyword}%`)},
            ]
        });
    }
}