import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
export class InventoryRepository {
  private repo: Repository<Inventory>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Inventory);
  }

  async createInventory(data: Partial<Inventory>): Promise<Inventory> {
    const inventory = this.repo.create(data);
    return await this.repo.save(inventory);
  }

  async findByUser(userId: number): Promise<Inventory[]> {
    return await this.repo.find({ where: { user: { id: userId } } });
  }

  async findById(id: number): Promise<Inventory | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async updateQuantity(id: number, quantity: number): Promise<void> {
    await this.repo.update(id, { quantity });
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
