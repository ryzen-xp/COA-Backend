import { Module } from '@nestjs/common';
import { StarknetService } from './services/starknet.service';
import { ConfigService } from '../../common/config.service';
import { StarknetController } from './controllers/starknet.controller';

@Module({
  providers: [StarknetService, ConfigService],
  controllers: [StarknetController],  
  exports: [StarknetService],
})
export class BlockchainModule {}
