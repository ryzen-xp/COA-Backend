import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cron } from "@nestjs/schedule";
import { Auction, AuctionStatus } from "../entities/auction.entity";
import { AuctionRepository } from "../repositories/auction.repository";
import { CreateAuctionDto } from "../dtos/auction.dto";

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private readonly auctionRepository: AuctionRepository
  ) {}

  async createAuction(createAuctionDto: CreateAuctionDto): Promise<Auction> {
    const auction = new Auction();
    auction.sellerId = createAuctionDto.sellerId;
    auction.itemId = createAuctionDto.itemId;
    auction.startPrice = createAuctionDto.startPrice;
    auction.currentBid = createAuctionDto.startPrice;
    auction.highestBidderId = null;
    auction.endTime = createAuctionDto.endTime;
    auction.status = AuctionStatus.ACTIVE;

    return this.auctionRepository.saveAuction(auction);
  }

  async placeBid(auctionId: number, bidderId: number, bidAmount: number): Promise<Auction> {
    const auction = await this.auctionRepository.findAuctionById(auctionId);
    if (!auction) {
      throw new NotFoundException("Auction not found");
    }
    if (auction.status !== AuctionStatus.ACTIVE) {
      throw new BadRequestException("Auction is not active");
    }
    if (bidAmount <= auction.currentBid) {
      throw new BadRequestException("Bid must be higher than the current bid");
    }
    if (auction.sellerId === bidderId) {
        throw new BadRequestException("Sellers cannot bid on their own auctions");
    }

    auction.currentBid = bidAmount;
    auction.highestBidderId = bidderId;
    return this.auctionRepository.saveAuction(auction);
  }

  async getActiveAuctions(): Promise<Auction[]> {
    return this.auctionRepository.findActiveAuctions();
  }

  async endAuction(auctionId: number): Promise<Auction> {
    const auction = await this.auctionRepository.findAuctionById(auctionId);
    if (!auction) {
      throw new NotFoundException("Auction not found");
    }
    auction.status = AuctionStatus.FINISHED;
    return this.auctionRepository.saveAuction(auction);
  }

  async getAuctionById(id: number): Promise<Auction> {
    const auction = await this.auctionRepository.findAuctionById(id);
    if (!auction) {
      throw new NotFoundException(`Auction with ID ${id} not found`);
    }
    return auction;
  }

  // 🔹 Nuevo método para finalizar subastas automáticamente
  @Cron("0 * * * * *") // Se ejecuta cada minuto
  async checkAndEndAuctions(): Promise<void> {
    const now = new Date();
    const expiredAuctions = await this.auctionRepository.findActiveAuctions();

    for (const auction of expiredAuctions) {
      if (auction.endTime <= now) {
        auction.status = AuctionStatus.FINISHED;
        await this.auctionRepository.saveAuction(auction);
      }
    }
  }
}
