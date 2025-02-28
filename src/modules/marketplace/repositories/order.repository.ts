import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  private readonly repo: Repository<Order>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Order);
  }

  async create(orderData: Partial<Order>): Promise<Order> {
    try {
      const order = this.repo.create(orderData);
      return await this.repo.save(order);
    } catch (error) {
      throw new InternalServerErrorException('Error creating order. Please try again.');
    }
  }

  async findById(id: number): Promise<Order | null> {
    const order = await this.repo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    return order;
  }

  async updateStatus(id: number, status: string): Promise<void> {
    const order = await this.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    
    try {
      return await this.repo.update(id, { status } as Partial<Order>).then();
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update order status: ${error.message}`);
    }
  }
}
