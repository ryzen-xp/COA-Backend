import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { NFTRepository } from './repositories/nft.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])], 
  providers: [TransactionRepository, TransactionService,NFTRepository],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
