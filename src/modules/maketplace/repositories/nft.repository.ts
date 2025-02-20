import { Repository } from 'typeorm';
// import { AppDataSource } from '../../../data-source';
import { NFT } from '../entities/nft.entity';

export const NFTRepository: Repository<NFT> = AppDataSource.getRepository(NFT);
