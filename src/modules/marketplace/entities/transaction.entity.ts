import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buyerId: number;

  @Column()
  sellerId: number;

  @Column()
  nftId: number;

  @Column({ type: 'float', default: 0 })
  price: number; 

  @CreateDateColumn()
  createdAt: Date;
}