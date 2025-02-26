import { IsNumber, IsPositive, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  buyerId: number;

  @IsNumber()
  @IsNotEmpty()
  nftId: number;

  @IsNumber()
  @IsPositive()
  price: number;
}

export class TransactionFilterDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  buyerId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sellerId?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  nftId?: number;
}
