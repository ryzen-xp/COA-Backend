import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class InventoryRepository {
  private repo: Repository<Inventory>;
  private userRepo: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Inventory);
    this.userRepo = this.dataSource.getRepository(User);
  }
  async createInventory(
    userId: number,
    data: Partial<Inventory>,
  ): Promise<Inventory> {
    const user = await this.userRepo.findOneBy({ id: userId });
    const inventory = this.repo.create({
      ...data,
      user,
    });

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
