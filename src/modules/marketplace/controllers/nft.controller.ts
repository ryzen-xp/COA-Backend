import { Body, Controller, Get, Param, Post, Put,  } from '@nestjs/common';
import { NFTService } from '../services/nft.service';
import { CreateNFTDto, UpdateNFTListingDto } from '../dtos/nft.dto';

@Controller('nfts')
export class NFTController {
  constructor(private readonly nftService: NFTService) {}

  @Post()
  async createNFT(@Body() createNFTDto: CreateNFTDto) {
    try {
      return await this.nftService.createNFT(createNFTDto);
    } catch (error: unknown) {
      return {
        statusCode: 400,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  @Get(':id')
  async getNFTById(@Param('id') id: number) {
    try {
      const nft = await this.nftService.getNFTById(id);
      if (!nft) {
        return {
          statusCode: 404,
          message: 'NFT not found',
        };
      }
      return nft;
    } catch (error: unknown) {
      return {
        statusCode: 400,
        message: error instanceof Error ? error.message : 'Failed to retrieve NFT',
      };
    }
  }

  @Get()
  async getAvailableNFTs() {
    try {
      return await this.nftService.getAvailableNFTs();
    } catch (error: unknown) {
      return {
        statusCode: 400,
        message: error instanceof Error ? error.message : 'Failed to retrieve NFTs',
      };
    }
  }

  @Put(':id/listing')
  async updateNFTListing(@Param('id') id: number, @Body() updateDto: UpdateNFTListingDto) {
    try {

      const updateDto = plainToInstance(UpdateNFTListingDto, req.body);
      const errors = await validate(updateDto);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      const nft = await NFTService.updateNFTListing(
        Number(req.params.id),
        updateDto,
      );
      res.json(nft);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });

      return await this.nftService.updateNFTListing(id, updateDto);
    } catch (error: unknown) {
      return {
        statusCode: 400,
        message: error instanceof Error ? error.message : 'Failed to update NFT listing',
      };

    }
  }
}
