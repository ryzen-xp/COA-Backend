import { NFT } from '../entities/nft.entity';
import { NFTRepository } from '../repositories/nft.repository';
import { CreateNFTDto, UpdateNFTListingDto } from '../dtos/nft.dto';

class NFTService {
  async createNFT(dto: CreateNFTDto): Promise<NFT> {
    const nft = NFTRepository.create({
      name: dto.name,
      description: dto.description,
      imageUrl: dto.imageUrl,
      ownerId: dto.ownerId,
      isListed: dto.isListed ?? false,
      price: dto.price ?? 0,
    });
    return NFTRepository.save(nft);
  }

  async getNFTById(id: number): Promise<NFT | null> {
    return NFTRepository.findOne({ where: { id } });
  }

  async getAvailableNFTs(): Promise<NFT[]> {
    return NFTRepository.find({ where: { isListed: true } });
  }

  async updateNFTListing(id: number, dto: UpdateNFTListingDto): Promise<NFT> {
    const nft = await NFTRepository.findOne({ where: { id } });
    if (!nft) {
      throw new Error('NFT not found');
    }
    nft.isListed = dto.isListed;
    if (dto.price !== undefined) {
      nft.price = dto.price;
    }
    return NFTRepository.save(nft);
  }
}

export default new NFTService();
