import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { StarknetRouterModule } from './routers';
import { StarknetController } from './modules/blockchain/controllers/starknet.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuración de TypeORM para PostgreSQL
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5433,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '12345',
      database: process.env.DB_NAME || 'coa_database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 🟢 Busca todas las entidades
      synchronize: process.env.NODE_ENV !== 'production', // 🚨 Solo usar en desarrollo
      logging: process.env.NODE_ENV !== 'production',
    }),

    UserModule,
    BlockchainModule,
    MarketplaceModule,
    StarknetRouterModule,
  ],
  controllers: [StarknetController],
})
export class AppModule {}
