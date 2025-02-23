import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leaderboard } from '../../game/entities/laderboard.entity';

@Injectable()
export class LeaderboardRepository {
  constructor(
    @InjectRepository(Leaderboard)
    private repository: Repository<Leaderboard>,
  ) {}

  async getTopPlayers(limit: number): Promise<Leaderboard[]> {
    return this.repository
      .createQueryBuilder('leaderboard')
      .orderBy('leaderboard.score', 'DESC')
      .limit(limit)
      .getMany();
  }
  async getPlayerRank(userId: number): Promise<Leaderboard | null> {
    return this.repository.findOne({ where: { userId } });
  }

  async saveEntry(entry: Leaderboard): Promise<void> {
    await this.repository.save(entry);
  }
}
