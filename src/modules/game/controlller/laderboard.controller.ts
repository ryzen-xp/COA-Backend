import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { LeaderboardService } from '../services/leaderboard.service';
import { LeaderboardDTO } from '../dtos/leaderboard.dto';
import type { LeaderboardResponseDTO } from '../dtos/leaderboard.dto';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly walletService: LeaderboardService) {}

  @Post()
  async create(@Body() createUserAchievementDto: LeaderboardDTO): Promise<LeaderboardResponseDTO> {
    try {
      return await this.walletService.create(createUserAchievementDto);
    } catch (error) {
      throw new HttpException('Failed to create leaderboard achievement', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getWallet() {
    return this.walletService.findAll();
  }
}
