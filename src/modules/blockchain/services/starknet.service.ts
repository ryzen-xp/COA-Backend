import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { RpcProvider, Contract } from 'starknet';
import { ConfigService } from '@/common/config.service';
import { NFTBalanceDto, NFTMetadataDto } from '../dtos/nft.dto';
import { TransferDto } from '../dtos/transfer.dto';

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
    const nodeUrl = this.configService.getNodeUrl();

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
        {
          name: 'safe_transfer_from',
          type: 'function',
          inputs: [
            {
              name: 'from',
              type: 'core::starknet::contract_address::ContractAddress',
            },
            {
              name: 'to',
              type: 'core::starknet::contract_address::ContractAddress',
            },
            {
              name: 'token_id',
              type: 'core::integer::u256',
            },
            {
              name: 'value',
              type: 'core::integer::u256',
            },
            {
              name: 'data',
              type: 'core::array::Span::<core::felt252>',
            },
          ],
          outputs: [],
          state_mutability: 'external',
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

      // Ensure walletAddress is properly converted
      const walletAddress = BigInt(
        this.configService.walletAddress.startsWith('0x'),
      );

      const balance = await this.contract.call('balance_of', [
        walletAddress,
        tokenId,
      ]);

      // Convert BigInt results to string before returning
      return JSON.parse(
        JSON.stringify(balance, (_, v) =>
          typeof v === 'bigint' ? v.toString() : v,
        ),
      );
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

      const bal = JSON.parse(
        JSON.stringify(balance, (_, v) =>
          typeof v === 'bigint' ? v.toString() : v,
        ),
      );

      return { account, tokenId, balance: bal };
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

  async transferNFT(transferDto: TransferDto): Promise<void> {
    try {
      const { from, to, tokenId } = transferDto;
      await this.contract.invoke('safe_transfer_from', [
        BigInt(from),
        BigInt(to),
        { low: BigInt(tokenId), high: BigInt(0) },
        { low: BigInt(1), high: BigInt(0) },
        [],
      ]);
      this.logger.log(
        `Successfully transferred token ${tokenId} from ${from} to ${to}`,
      );
    } catch (error) {
      this.logger.error(`Error transferring NFT: ${error.message}`);
      throw new Error(`Failed to transfer token ${transferDto.tokenId}`);
    }
  }
}
