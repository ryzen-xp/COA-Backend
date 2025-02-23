import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get(':userId')
  async getWallet(@Param('userId') userId: number) {
    return this.walletService.getWalletByUserId(userId);
  }

  @Patch(':userId')
  async updateBalance(@Param('userId') userId: number, @Body('amount') amount: number) {
    return this.walletService.updateBalance(userId, amount);
  }
}
