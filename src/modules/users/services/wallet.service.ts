import { Injectable, NotFoundException } from '@nestjs/common';
import { WalletRepository } from '../repositories/wallet.repository';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}

  async getWalletByUserId(userId: number) {
    const wallet = await this.walletRepository.findByUserId(userId);
    if (!wallet) throw new NotFoundException('Wallet not found');
    return wallet;
  }

  async updateBalance(userId: number, amount: number) {
    const wallet = await this.walletRepository.findByUserId(userId);
    if (!wallet) throw new NotFoundException('Wallet not found');
    
    await this.walletRepository.updateBalance(wallet.id, amount);
    return { message: 'Balance updated successfully' };
  }
}
