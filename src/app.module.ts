/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/users/user.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import { StarknetRouterModule } from './routers';
import { StarknetController } from './modules/blockchain/controllers/starknet.controller';
import { WalletModule } from './modules/users/wallet.module';
import { WalletController } from './modules/users/controllers/wallet.controller';
//import { NFTModule } from './modules/marketplace/nft.module';
//import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Main application module
 *
 * Database Configuration (Commented for future use):
 * Uncomment the TypeOrmModule.forRoot() section when:
 * 1. You need to connect to a PostgreSQL database
 * 2. You're moving to production
 *
 * For local testing without database:
 * - Keep TypeOrmModule commented out
 * - Use in-memory storage in services
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  //Database configuration - Uncomment when database connection is needed
  //  TypeOrmModule.forRoot({
  //  name: 'default',
  //  type: 'postgres',
  //    host: process.env.DB_HOST || 'localhost',
  //     port: parseInt(process.env.DB_PORT) || 5433,
  //    username: process.env.DB_USER || 'postgres',
  //    password: process.env.DB_PASS || '12345',
  //    database: process.env.DB_NAME || 'coa_database',
  //    entities: [__dirname + '/**/*.entity{.ts,.js}'], // 🟢 Busca todas las entidades
  //     synchronize: process.env.NODE_ENV !== 'production', // 🚨 Solo usar en desarrollo
  //     logging: process.env.NODE_ENV !== 'production',
  //   }),
    
    UserModule,
    // TransactionModule,
    //NFTModule,
    BlockchainModule,
    StarknetRouterModule,
   // WalletModule,
  ],
  controllers: [StarknetController],
})
export class AppModule {}
