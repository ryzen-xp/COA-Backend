import { Repository } from 'typeorm';
import { Trade } from '../entities/trade.entity';

export const TradeRepository: Repository<Trade> =
  AppDataSource.getRepository(Trade);
