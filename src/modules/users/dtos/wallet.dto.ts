
import { IsUUID, IsNumber, IsObject, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';
import { User } from '../entities/user.entity';
export class UpdateBalanceDto {
  @IsNumber()
  wallet_id:string;
  amount: number;

}
export class createWalletDTO {
  @IsUUID() 
  wallet_id: string;

  @ValidateNested() 
  @Type(() => User) 
  user: User;

  @IsNumber()
  @Min(0) 
  balance: number;
}
export class WalletResponseDTO {
  user: User;
  balance: number;

  constructor(data: Wallet) {
      this.user = data.user;
      this.balance = data.balance;
  }
}
