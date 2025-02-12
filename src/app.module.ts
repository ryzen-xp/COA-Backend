import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';

@Module({
  imports: [
    // TypeORM configuration (make sure to have the proper settings)
    TypeOrmModule.forRoot({
      type: 'postgres', // or the database engine you are using
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Only for development
    }),
    UserModule,
    BlockchainModule,
  ],
})
export class AppModule {}
