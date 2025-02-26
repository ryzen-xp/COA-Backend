import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NFT } from '../entities/nft.entity';
import { CreateNFTDto, UpdateNFTListingDto } from '../dtos/nft.dto';

@Injectable()
export class NFTService {
  constructor(
    @InjectRepository(NFT)
    private readonly nftRepository: Repository<NFT>,
  ) {}

  async createNFT(dto: CreateNFTDto): Promise<NFT> {
    const nft = this.nftRepository.create({
      name: dto.name,
      description: dto.description,
      imageUrl: dto.imageUrl,
      ownerId: dto.ownerId,
      isListed: dto.isListed ?? false,
      price: dto.price ?? 0,
    });
    return await this.nftRepository.save(nft);
  }

  async getNFTById(id: number): Promise<NFT | null> {
    return await this.nftRepository.findOne({ where: { id } });
  }

  async getAvailableNFTs(): Promise<NFT[]> {
    return await this.nftRepository.find({ where: { isListed: true } });
  }

  async updateNFTListing(id: number, dto: UpdateNFTListingDto): Promise<NFT> {
    const nft = await this.nftRepository.findOne({ where: { id } });
    if (!nft) {
      throw new Error('NFT not found');
    }
    nft.isListed = dto.isListed;
    if (dto.price !== undefined) {
      nft.price = dto.price;
    }
    return await this.nftRepository.save(nft);
  }
}
