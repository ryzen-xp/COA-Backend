import { getRepository } from 'typeorm';
import { NFT } from '../entities/nft.entity';
import { CreateNFTDto, UpdateNFTListingDto } from '../dtos/nft.dto';

class NFTService {
  private nftRepository = getRepository(NFT);

  async createNFT(dto: CreateNFTDto): Promise<NFT> {
    const nft = this.nftRepository.create({
      name: dto.name,
      description: dto.description,
      imageUrl: dto.imageUrl,
      ownerId: dto.ownerId,
      isListed: dto.isListed ?? false,
      price: dto.price ?? 0,
    });
    return this.nftRepository.save(nft);
  }

  async getNFTById(id: number): Promise<NFT | null> {
    return this.nftRepository.findOne({ where: { id } });
  }

  async getAvailableNFTs(): Promise<NFT[]> {
    return this.nftRepository.find({ where: { isListed: true } });
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
    return this.nftRepository.save(nft);
  }
}

export default new NFTService();
