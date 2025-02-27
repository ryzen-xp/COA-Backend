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
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'mydatabase',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ⚠️ Cambiar a false en producción para evitar pérdida de datos
      logging: true, // Activa logs de consultas
      ssl: process.env.DB_SSL === 'true', // Solo para producción si usas SSL
    }),

    UserModule,
    BlockchainModule,
    MarketplaceModule,
    StarknetRouterModule,
  ],
  controllers: [StarknetController],
})
export class AppModule {}
