import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { Receipt } from './receipt.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( type => Product, product => product.id )
    product: Product;

    @ManyToOne( type => Receipt, receipt => receipt.id )
    receipt: Receipt;
    
    @Column()
    price: number;
    
    @Column()
    count: number;
    
    @Column()
    discount: number;

    @Column({ default: true })
    isActive: boolean;
}