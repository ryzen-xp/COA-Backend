import { EntityRepository, Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {
  async findByUserId(userId: number): Promise<Wallet | null> {
    return this.findOne({ where: { user: { id: userId } } });
  }

  async updateBalance(walletId: number, amount: number): Promise<void> {
    await this.createQueryBuilder()
      .update(Wallet)
      .set({ balance: () => `balance + ${amount}` })
      .where('id = :id', { id: walletId })
      .execute();
  }
}
