import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.wallet, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'decimal', precision: 18, scale: 8, default: 0 })
  balance: number;
}
