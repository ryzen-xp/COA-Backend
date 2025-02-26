import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';

@Injectable()
export class WalletRepository {
  private readonly repo: Repository<Wallet>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Wallet); 
  }

  async create(walletData: Partial<Wallet>): Promise<Wallet> {
    const wallet = this.repo.create(walletData);
    return await this.repo.save(wallet);
  }

  async findAll(): Promise<Wallet[]> {
    return await this.repo.find();
  }

  async delete(walletID: string): Promise<void> {
    await this.repo.delete({ wallet_id: walletID });
  }
}
