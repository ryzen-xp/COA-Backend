import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryRepository } from '../repositories/inventory.repository';
import { Inventory } from '../entities/inventory.entity';
import { CreateInventoryDto, UpdateInventoryDto } from '../dtos/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepo: InventoryRepository) {}

  async addItem(userId: number, dto: CreateInventoryDto): Promise<Inventory> {
    return await this.inventoryRepo.createInventory(userId, dto);
  }

  async getUserInventory(userId: number): Promise<Inventory[]> {
    return await this.inventoryRepo.findByUser(userId);
  }

  async updateItem(id: number, dto: UpdateInventoryDto): Promise<void> {
    const item = await this.inventoryRepo.findById(id);
    if (!item) throw new NotFoundException('Item not found');
    await this.inventoryRepo.updateQuantity(id, dto.quantity);
  }

  async removeItem(id: number): Promise<void> {
    const item = await this.inventoryRepo.findById(id);
    if (!item) throw new NotFoundException('Item not found');
    await this.inventoryRepo.delete(id);
  }
}
