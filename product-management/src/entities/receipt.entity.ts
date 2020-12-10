import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { User } from './user.entity';

export enum ReceiptStatus {
    Payment,
    Pending,
    Approved,
    Rejected,
    Cancel
}
@Entity()
export class Receipt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column({ type: 'timestamp' })
    createDate: Date;

    @Column({ type: String, length: 16 })
    status: ReceiptStatus;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(type => User, user => user.id)
    user: User

    @OneToMany(type => Order, order => order.id)
    orders: Order[]
}