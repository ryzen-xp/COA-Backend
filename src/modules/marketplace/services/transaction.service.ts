import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { CreateTransactionDto, GetTransactionsDto } from '../dtos/transaction.dto';
import { NFTRepository } from '../repositories/nft.repository'; // Siguiendo el mismo estilo

@Injectable()
export class TransactionService {
  constructor() {} 

  async createTransaction(dto: CreateTransactionDto) {
    const nft = await NFTRepository.findOne({ where: { id: dto.nftId } });
    if (!nft) throw new NotFoundException('NFT not found');
    //Validamos que no se pueda comprar su propio NFT
    if (dto.buyerId === nft.ownerId) {
      throw new BadRequestException('You cannot buy your own NFT');
    }

    const transaction = TransactionRepository.create({
      buyerId: dto.buyerId,
      sellerId: nft.ownerId,
      nftId: dto.nftId,
      price: dto.price,
    });

    return TransactionRepository.save(transaction);
  }
  //Aqui podemos filtrar por buyerId y sellerId
  async getTransactions(filter: GetTransactionsDto) {
    return TransactionRepository.find({ where: filter });
  }
}