import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { createWalletDTO } from '../dtos/wallet.dto';
import type { WalletResponseDTO } from '../dtos/wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(@Body() createUserAchievementDto: createWalletDTO): Promise<WalletResponseDTO> {
    try {
      return await this.walletService.create(createUserAchievementDto);
    } catch (error) {
      throw new HttpException('Failed to create user achievement', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get()
  async getWallet() {
    return this.walletService.findAll();
  }

}
