import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';
import { Wallet } from './wallet.entity';
import { Inventory } from './inventory.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true, length: 50 })
  @MinLength(3)
  username: string;

  @Index()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  @MinLength(8)
  password: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  // Relación OneToOne con Wallet
  @OneToOne(() => Wallet, (wallet) => wallet.user, { cascade: true })
  @JoinColumn() // Especifica que la clave foránea estará en esta tabla
  wallet: Wallet;

  @OneToMany(() => Inventory, (inventory) => inventory.user, { cascade: true })
  inventory: Inventory[];
}
