import { Controller, Get, Post, Param, Body, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { StarknetService } from '../blockchain/starknet.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

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
    @Body('tokenId') tokenId: string,
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
      res.status(500).json({ message: `Minting failed: ${error.message}` });
    }
  }

  @ApiOperation({ summary: 'Transfer a token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        to: { type: 'string', description: 'Recipient address' },
        tokenId: { type: 'string', description: 'Token ID' },
        amount: {
          type: 'number',
          description: 'Amount to transfer',
          nullable: true,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Token transferred successfully' })
  @ApiResponse({ status: 500, description: 'Transfer failed' })
  @Post('transfer')
  async transferToken(
    @Response() res: Res,
    @Body('to') to: string,
    @Body('tokenId') tokenId: string,
    @Body('amount') amount?: number,
  ): Promise<void> {
    try {
      const response = await this.starknetService.transferNFT(
        to,
        tokenId,
        amount,
      );
      res.status(200).json({
        message: 'Token transferred successfully',
        hash: response.hash,
      });
    } catch (error) {
      res.status(500).json({
        message: `Transfer failed: ${error.message}`,
      });
    }
  }
}
