import { IsInt, IsPositive } from 'class-validator';

export class CreateInventoryDto {
  @IsInt()
  userId: number;

  @IsInt()
  nftId: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}

export class UpdateInventoryDto {
  @IsInt()
  @IsPositive()
  quantity: number;
}
