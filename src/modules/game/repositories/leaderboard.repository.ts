import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Leaderboard } from '../entities/laderboard.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LeaderboardRepository {

  constructor(@InjectRepository(Leaderboard)
  private readonly repo: Repository<Leaderboard>,
) {
    
  }

  async create(walletData: Partial<Leaderboard>): Promise<Leaderboard> {
    const wallet = this.repo.create(walletData);
    return await this.repo.save(wallet);
  }

  async findAll(): Promise<Leaderboard[]> {
    return await this.repo.find();
  }

  async delete(walletID: number): Promise<void> {
    await this.repo.delete({ id: walletID });
  }
}
