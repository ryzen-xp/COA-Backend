import { IsNumber, IsPositive, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber({}, { message: 'buyerId must be a number' })
  @IsNotEmpty({ message: 'buyerId is required' })
  buyerId: number;

  @IsNumber({}, { message: 'nftId must be a number' })
  @IsNotEmpty({ message: 'nftId is required' })
  nftId: number;

  @IsNumber({}, { message: 'price must be a number' })
  @IsPositive({ message: 'price must be greater than 0' })
  price: number;
}

export class GetTransactionsDto {
  @IsNumber({}, { message: 'buyerId must be a number' })
  @IsOptional()
  buyerId?: number;

  @IsNumber({}, { message: 'sellerId must be a number' })
  @IsOptional()
  sellerId?: number;
}
