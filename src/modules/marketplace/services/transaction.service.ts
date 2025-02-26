import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { NFTRepository } from '../repositories/nft.repository';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto, TransactionFilterDto } from '../dtos/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepo: TransactionRepository,
    private readonly nftRepo: NFTRepository,
  ) {}

  async createTransaction(dto: CreateTransactionDto): Promise<Transaction> {
    const nft = await this.nftRepo.findById(dto.nftId);

    if (!nft) {
      throw new Error('NFT not found');
    }

    if (dto.buyerId === nft.ownerId) {
      throw new Error('User cannot buy their own NFT');
    }

    const transaction = await this.transactionRepo.create({
      buyerId: dto.buyerId,
      sellerId: nft.ownerId,
      nftId: dto.nftId,
      price: dto.price,
    });

    await this.nftRepo.update(dto.nftId, { ownerId: dto.buyerId });

    return transaction;
  }

  async getTransactions(filter: TransactionFilterDto): Promise<Transaction[]> {
    if (filter.buyerId) return this.transactionRepo.findByBuyer(filter.buyerId);
    if (filter.sellerId) return this.transactionRepo.findBySeller(filter.sellerId);
    if (filter.nftId) return this.transactionRepo.findByNFT(filter.nftId);
    return this.transactionRepo.findAll();
  }

  async getTransactionById(id: number): Promise<Transaction | null> {
    return this.transactionRepo.findById(id);
  }

  async getLatestTransactions(limit: number = 10): Promise<Transaction[]> {
    return this.transactionRepo.getLatestTransactions(limit);
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionRepo.findAll();
  }
}