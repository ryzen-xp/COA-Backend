import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { RpcProvider, Contract } from 'starknet';
import { ConfigService } from '@/common/config.service';
import { NFTBalanceDto, NFTMetadataDto } from '../dtos/nft.dto';

@Injectable()
export class StarknetService implements OnModuleInit {
  private readonly logger = new Logger(StarknetService.name);
  private provider: RpcProvider;
  private contract: Contract;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    try {
      await this.initializeStarknet();
    } catch (error) {
      this.logger.error('Failed to initialize Starknet service', error);
      throw error;
    }
  }

  private async initializeStarknet() {
    // Validate configuration
    const contractAddress = this.configService.contractAddress;
    const walletAddress = this.configService.walletAddress;

    if (!contractAddress) {
      throw new Error('Contract address is not defined in configuration');
    }

    if (!walletAddress) {
      throw new Error('Wallet address is not defined in configuration');
    }

    // Initialize provider
    const nodeUrl = this.configService.starknetNetwork
      ? this.configService.starknetNetwork
      : 'https://starknet-sepolia.public.blastapi.io';
    this.provider = new RpcProvider({ nodeUrl });
    this.logger.log(
      `Initialized Starknet provider with network: ${this.configService.starknetNetwork}`,
    );

    try {
      // Initialize contract
      const contractAbi = [
        {
          name: 'balance_of',
          type: 'function',
          inputs: [
            {
              name: 'account',
              type: 'core::starknet::contract_address::ContractAddress',
            },
            { name: 'token_id', type: 'core::integer::u256' },
          ],
          outputs: [{ type: 'core::integer::u256' }],
          state_mutability: 'view',
        },
        {
          name: 'uri',
          type: 'function',
          inputs: [{ name: 'token_id', type: 'core::integer::u256' }],
          outputs: [{ type: 'core::byte_array::ByteArray' }],
          state_mutability: 'view',
        },
      ];

      this.contract = new Contract(contractAbi, contractAddress, this.provider);

      this.logger.log('Successfully initialized Starknet contract');
    } catch (error) {
      this.logger.error('Failed to initialize contract', error);
      throw new Error(
        'Failed to initialize Starknet contract: ' + error.message,
      );
    }
  }

  async getBlock(): Promise<any> {
    try {
      return await this.provider.getBlock('latest');
    } catch (error) {
      this.logger.error('Error fetching latest block:', error.message);
      throw new Error('Failed to fetch latest block');
    }
  }

  async getContractStatus(): Promise<any> {
    try {
      const tokenId = { low: BigInt(1), high: BigInt(0) };
      const balance = await this.contract.call('balance_of', [
        BigInt(this.configService.walletAddress),
        tokenId,
      ]);
      return balance;
    } catch (error) {
      this.logger.error(`Error fetching contract status: ${error.message}`);
      throw new Error('Failed to fetch contract status');
    }
  }

  async getBalance(account: string, tokenId: string): Promise<NFTBalanceDto> {
    try {
      const balance = await this.contract.call('balance_of', [
        BigInt(account),
        { low: BigInt(tokenId), high: BigInt(0) },
      ]);

      return { account, tokenId, balance: Number(balance[0].low) };
    } catch (error) {
      this.logger.error(`Error fetching balance: ${error.message}`);
      throw new Error('Failed to fetch balance');
    }
  }

  async getTokenURI(tokenId: string): Promise<NFTMetadataDto> {
    try {
      const uriResponse = await this.contract.call('uri', [
        { low: BigInt(tokenId), high: BigInt(0) },
      ]);

      if (!uriResponse || !uriResponse[0]?.data) {
        throw new Error(`No metadata found for token ID ${tokenId}`);
      }

      const uriData = uriResponse[0].data
        .map((felt: any) => Buffer.from(felt, 'hex').toString())
        .join('');
      return { tokenId, uri: uriData };
    } catch (error) {
      this.logger.error(`Error fetching token URI: ${error.message}`);
      throw new Error(`Failed to fetch token URI for ID ${tokenId}`);
    }
  }
}
