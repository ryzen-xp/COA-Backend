import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  buyerId: number;

  @IsNumber()
  @IsPositive()
  sellerId: number;

  @IsNumber()
  @IsPositive()
  itemId: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  currency: string;
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
