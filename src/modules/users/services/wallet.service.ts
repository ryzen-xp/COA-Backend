import { Injectable, NotFoundException } from "@nestjs/common";
import { WalletRepository } from "../repositories/wallet.repository";
import { WalletResponseDTO  } from "../dtos/wallet.dto";
import { Wallet } from "../entities/wallet.entity";
import type { createWalletDTO } from "../dtos/wallet.dto";

@Injectable()
export class WalletService {
    constructor(
        private readonly walletRepository: WalletRepository
    ) {}

    async create(dto: createWalletDTO): Promise<Wallet> {
        return await this.walletRepository.create(dto);
    }

    
    async findAll(): Promise<Wallet[]> {
        return await this.walletRepository.findAll();
    }

    async deleteUserAchievement(user_id: string): Promise<void> {
        return this.walletRepository.delete(user_id);
      }
}