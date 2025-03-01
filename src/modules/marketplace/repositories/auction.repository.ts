import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Auction, AuctionStatus } from "../entities/auction.entity";

@Injectable()
export class AuctionRepository {
  constructor(
    @InjectRepository(Auction)
    private readonly repository: Repository<Auction>,
  ) {}

  async findActiveAuctions(): Promise<Auction[]> {
    return this.repository.find({ where: { status: AuctionStatus.ACTIVE } });
  }

  async saveAuction(auction: Auction): Promise<Auction> {
    return this.repository.save(auction);
  }

  async findAuctionById(id: number): Promise<Auction | null> {
    return this.repository.findOne({ where: { id } });
  }
}
