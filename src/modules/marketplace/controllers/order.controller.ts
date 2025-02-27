import { Controller, Post, Body, Get, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto, UpdateOrderStatusDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createOrder(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(dto);
  }

  @Get(':id')
  async getOrder(@Param('id') id: number): Promise<Order | null> {
    return this.orderService.getOrderById(id);
  }

  @Patch(':id/status')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateStatus(
    @Param('id') id: number,
    @Body() dto: UpdateOrderStatusDto,
  ): Promise<void> {
    return this.orderService.updateOrderStatus(id, dto);
  }
}
