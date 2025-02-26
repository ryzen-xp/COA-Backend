import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';
import { ChatRepository } from './repositories/chat.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatRepository]),
    // ... other imports
  ],
  controllers: [ChatController, /* ... other controllers */],
  providers: [ChatService, /* ... other services */],
})
export class MarketplaceModule {} 