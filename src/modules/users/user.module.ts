import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // ⬅️ Agregado
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { InventoryRepository } from './repositories/inventory.repository';
import { InventoryService } from './services/inventory.service';
import { InventoryController } from './controllers/inventory.controller';
import { Inventory } from './entities/inventory.entity'; // ⬅️ Importamos la entidad

/**
 * User Module Configuration
 *
 * Database Integration (Commented for future use):
 * When connecting to database, uncomment:
 * 1. TypeOrmModule import
 * 2. TypeOrmModule.forFeature([User]) in imports array
 *
 * For local testing:
 * - Using in-memory storage implementation
 * - No database connection required
 */
@Module({
  imports: [TypeOrmModule.forFeature([Inventory])], // ⬅️ Agregado para TypeORM
  controllers: [UserController, InventoryController],
  providers: [
    UserService,
    InventoryService,
    UserRepository,
    InventoryRepository,
  ],
  exports: [UserService, InventoryService],
})
export class UserModule {}
