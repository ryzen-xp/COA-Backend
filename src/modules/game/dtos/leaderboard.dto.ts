import { IsInt, IsPositive, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Leaderboard } from '../entities/laderboard.entity';

export class LeaderboardDTO {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  readonly id: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  readonly userId: number;

  @IsInt()
  @Type(() => Number)
  readonly score: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  readonly rank?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  readonly updatedAt?: Date;
}

export class LeaderboardResponseDTO {
  id: number;
  userId: number;
  score: number;
  rank: number;

  constructor(data: Leaderboard) {
    this.id = data.id;
    this.userId = data.userId;
    this.score = data.score;
    this.rank = data.rank;
  }
}
