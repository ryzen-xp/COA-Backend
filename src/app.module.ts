import { Module } from '@nestjs/common';
import { BlockchainModule } from './modules/blockchain/blockchain.module';

@Module({
  imports: [BlockchainModule],
})
export class AppModule {}
