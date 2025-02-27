import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { Order, OrderStatus } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderStatusDto } from '../dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    return this.orderRepository.create({
      ...dto,
      status: OrderStatus.PENDING,
    });
  }

  async getOrderById(id: number): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async updateOrderStatus(id: number, dto: UpdateOrderStatusDto): Promise<void> {
    const order = await this.getOrderById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    if (order.status === OrderStatus.COMPLETED || order.status === OrderStatus.CANCELLED) {
        throw new BadRequestException(`Cannot update order ${id} because it is already ${order.status}.`);
    }
    if (order.status === dto.status) {
      throw new BadRequestException(`Order ${id} is already in status ${dto.status}.`);
    }
    await this.orderRepository.updateStatus(id, dto.status);
  }
}
