import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { InventoryService } from '../services/inventory.service';
import { CreateInventoryDto, UpdateInventoryDto } from '../dtos/inventory.dto';
import { Inventory } from '../entities/inventory.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post(':userId')
  async addItem(
    @Param('userId') userId: number,
    @Body() dto: CreateInventoryDto,
  ): Promise<Inventory> {
    return this.inventoryService.addItem(userId, dto);
  }

  @Get(':userId')
  async getUserInventory(
    @Param('userId') userId: number,
  ): Promise<Inventory[]> {
    return this.inventoryService.getUserInventory(userId);
  }

  @Put(':id')
  async updateItem(
    @Param('id') id: number,
    @Body() dto: UpdateInventoryDto,
  ): Promise<void> {
    return this.inventoryService.updateItem(id, dto);
  }

  @Delete(':id')
  async removeItem(@Param('id') id: number): Promise<void> {
    return this.inventoryService.removeItem(id);
  }
}
