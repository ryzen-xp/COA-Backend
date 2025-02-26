import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity("wallet")
export class Wallet {
  @PrimaryColumn("uuid")
  wallet_id: string;

  @ManyToOne(() => User, (user) => user.wallet, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'decimal', precision: 18, scale: 8, default: 0 })
  balance: number;
}
