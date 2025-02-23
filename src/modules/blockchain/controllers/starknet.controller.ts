import { Controller, Get, Param, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { StarknetService } from '../services/starknet.service';

@Controller('blockchain')
export class StarknetController {
  constructor(private readonly starknetService: StarknetService) {}

  @Get('block')
  async getLatestBlock(@Response() res: Res): Promise<void> {
    try {
      const block = await this.starknetService.getBlock();
      res.status(200).json(block);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Get('contract-status')
  async getContractStatus(@Response() res: Res): Promise<void> {
    try {
      const status = await this.starknetService.getContractStatus();
      res.status(200).json(status);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Get('balance/:account/:tokenId')
  async getBalance(
    @Param('account') account: string,
    @Param('tokenId') tokenId: string,
    @Response() res: Res,
  ): Promise<void> {
    try {
      const balance = await this.starknetService.getBalance(account, tokenId);
      res.status(200).json(balance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Get('token/:tokenId')
  async getTokenURI(
    @Param('tokenId') tokenId: string,
    @Response() res: Res,
  ): Promise<void> {
    try {
      const metadata = await this.starknetService.getTokenURI(tokenId);
      res.status(200).json(metadata);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @Get('test')
  async getHello(@Response() res: Res): Promise<void> {
    res.status(200).json({ message: 'Hello, World!' });
  }
}
