import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    descr: string;

    @Column()
    price: number;

    @Column()
    img: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany( type => Order, order => order.product )
    orders: Order[];
}