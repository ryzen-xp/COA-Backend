import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NFT } from './entities/nft.entity';
import { NFTRepository } from './repositories/nft.repository';
import { NFTService } from './services/nft.service';
import { NFTController } from './controllers/nft.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NFT])],
  providers: [NFTRepository, NFTService],
  controllers: [NFTController],
  exports: [NFTService],
})
export class NFTModule {}
