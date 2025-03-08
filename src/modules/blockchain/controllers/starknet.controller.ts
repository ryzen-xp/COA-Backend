import { Controller, Get, Post, Param, Body, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { StarknetService } from '../services/starknet.service';
import { TransferDto } from '../dtos/transfer.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { num } from 'starknet';

@ApiTags('blockchain')
@Controller('blockchain')
export class StarknetController {
  constructor(private readonly starknetService: StarknetService) {}

  @ApiOperation({ summary: 'Get latest block information' })
  @ApiResponse({
    status: 200,
    description: 'Returns the latest block information',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('block')
  async getLatestBlock(@Response() res: Res): Promise<void> {
    try {
      const block = await this.starknetService.getBlock();
      res.status(200).json(block);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @ApiOperation({ summary: 'Get contract status' })
  @ApiResponse({ status: 200, description: 'Returns the contract status' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Get('contract-status')
  async getContractStatus(@Response() res: Res): Promise<void> {
    try {
      const status = await this.starknetService.getContractStatus();
      res.status(200).json(status);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @ApiOperation({ summary: 'Get token balance for an account' })
  @ApiParam({ name: 'account', description: 'Account address' })
  @ApiParam({ name: 'tokenId', description: 'Token ID' })
  @ApiResponse({ status: 200, description: 'Returns the token balance' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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

  @ApiOperation({ summary: 'Get token metadata' })
  @ApiParam({ name: 'tokenId', description: 'Token ID' })
  @ApiResponse({ status: 200, description: 'Returns the token metadata' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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

  @ApiOperation({ summary: 'Mint a token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        tokenId: { type: 'string' },
        amount: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Token minted successfully' })
  @ApiResponse({ status: 500, description: 'Minting failed' })
  @Post('mint')
  async mintToken(
    @Body('tokenId') tokenId: number,
    @Body('amount') amount: number,
    @Response() res: Res,
  ): Promise<void> {
    try {
      const response = await this.starknetService.mintToken(tokenId, amount);
      res.status(200).json({
        message: 'Token minted successfully',
        hash: response.hash,
      });
    } catch (error) {
      console.error('Token minting failed:', error);
      res.status(500).json({ message: `Minting failed: ${error.message}` });
    }
  }

  @ApiOperation({ summary: 'Transfer tokens between accounts' })
  @ApiBody({ type: TransferDto, description: 'Transfer details' })
  @ApiResponse({ status: 200, description: 'Tokens transferred successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('transfer')
  async transferNFT(
    @Body() transferDto: TransferDto,
    @Response() res: Res,
  ): Promise<void> {
    try {
      const tx = await this.starknetService.transferNFT(transferDto);
      res.status(200).json({
        message: `${transferDto.amount || 1} token(s) with ID ${transferDto.tokenId} transferred to ${transferDto.to}`,
        hash: tx.hash,
        explorerUrl: `https://sepolia.starkscan.co/tx/${tx.hash}`,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
