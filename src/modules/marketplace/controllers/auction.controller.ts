import { Controller, Post, Body, Param, ParseIntPipe, Get, NotFoundException } from '@nestjs/common';
import { Auction } from '../entities/auction.entity';
import { AuctionService } from '../services/auction.service';
import { CreateAuctionDto, PlaceBidDto } from '../dtos/auction.dto';

@Controller('auctions')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  async createAuction(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionService.createAuction(createAuctionDto);
  }

  @Post('bid')
  async placeBid(@Body() placeBidDto: PlaceBidDto) {
    const { auctionId, bidderId, bidAmount } = placeBidDto;
    return this.auctionService.placeBid(auctionId, bidderId, bidAmount);
  }

  @Get('active')
  async getActiveAuctions() {
    return this.auctionService.getActiveAuctions();
  }

  @Get(':id')
  async getAuctionById(@Param('id', ParseIntPipe) id: number): Promise<Auction> {
    return this.auctionService.getAuctionById(id);
  }
  

}
