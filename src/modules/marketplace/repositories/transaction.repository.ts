import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionRepository {
  private readonly repo: Repository<Transaction>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Transaction); // Inicializa el repositorio con DataSource
  }

  async create(transactionData: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.repo.create(transactionData);
    return await this.repo.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return await this.repo.find();
  }

  async findById(id: number): Promise<Transaction | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async findByBuyer(buyerId: number): Promise<Transaction[]> {
    return await this.repo.find({ where: { buyerId } });
  }

  async findBySeller(sellerId: number): Promise<Transaction[]> {
    return await this.repo.find({ where: { sellerId } });
  }

  async findByNFT(nftId: number): Promise<Transaction[]> {
    return await this.repo.find({ where: { nftId } });
  }

  async getLatestTransactions(limit: number = 10): Promise<Transaction[]> {
    return await this.repo.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}
