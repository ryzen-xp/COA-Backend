import { Injectable } from '@nestjs/common';
import { LeaderboardRepository } from '../repositories/leaderboard.repository';
import { Leaderboard } from '../entities/laderboard.entity';
import type { LeaderboardDTO } from '../dtos/leaderboard.dto';

@Injectable()
export class LeaderboardService {
  constructor(private readonly walletRepository: LeaderboardRepository) {}

  async create(dto: LeaderboardDTO): Promise<Leaderboard> {
    return await this.walletRepository.create(dto);
  }

  async findAll(): Promise<Leaderboard[]> {
    return await this.walletRepository.findAll();
  }
  async deleteUserAchievement(id: number): Promise<void> {
    return this.walletRepository.delete(id);
  }
}
