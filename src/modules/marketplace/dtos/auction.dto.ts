import { IsNotEmpty, IsNumber, IsEnum, IsPositive, IsDate } from "class-validator";
import { AuctionStatus } from "../entities/auction.entity";

export class CreateAuctionDto {
  @IsNotEmpty()
  @IsNumber()
  sellerId: number;

  @IsNotEmpty()
  @IsNumber()
  itemId: number;

  @IsPositive()
  startPrice: number;

  @IsNotEmpty()
  @IsDate()
  endTime: Date;
}

export class PlaceBidDto {
  @IsNotEmpty()
  @IsNumber()
  auctionId: number;

  @IsNotEmpty()
  @IsNumber()
  bidderId: number;

  @IsPositive()
  bidAmount: number;
}

export class UpdateAuctionStatusDto {
  @IsNotEmpty()
  @IsEnum(AuctionStatus)
  status: AuctionStatus;
}
