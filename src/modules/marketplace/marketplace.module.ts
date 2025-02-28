import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketplaceListingService } from './services/marketplace-listing.service';
import { MarketplaceListingController } from './controllers/marketplace-listing.controller';
import { MarketplaceListingRepository } from './repositories/marketplace-listing.repository';
import { MarketplaceListing } from './entities/marketplace-listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarketplaceListing])],
  controllers: [MarketplaceListingController],
  providers: [MarketplaceListingService, MarketplaceListingRepository],
  exports: [MarketplaceListingService],
})
export class MarketplaceModule {}
