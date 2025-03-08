import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { RpcProvider, Contract, Account, cairo } from 'starknet';
import { ConfigService } from '@/common/config.service';
import { NFTBalanceDto, NFTMetadataDto } from '../dtos/nft.dto';
import { TransferDto } from '../dtos/transfer.dto';
import erc1155Abi from '@/common/Abi';

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
    const contractAddress = this.configService.contractAddress;
    const walletAddress = this.configService.walletAddress;

    if (!contractAddress) {
      throw new Error('Contract address is not defined in configuration');
    }

    if (!walletAddress) {
      throw new Error('Wallet address is not defined in configuration');
    }

    const nodeUrl = this.configService.getNodeUrl();
    this.provider = new RpcProvider({ nodeUrl });
    this.logger.log(`Initialized Starknet provider`);

    try {
      this.contract = new Contract(
        erc1155Abi,
        contractAddress,
        this.provider,
      ).typedv2(erc1155Abi);
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
      const walletAddress = BigInt(
        this.configService.walletAddress.startsWith('0x'),
      );
      const balance = await this.contract.call('balance_of', [
        walletAddress,
        tokenId,
      ]);
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
      const uriResponse = await this.contract.callStatic.uri({
        low: BigInt(tokenId),
        high: BigInt(0),
      });
      if (!uriResponse) {
        return { tokenId, uri: '' };
      }
      return { tokenId, uri: uriResponse };
    } catch (error) {
      this.logger.error(`Error fetching token URI: ${error.message}`);
      throw new Error(`Failed to fetch token URI for ID ${tokenId}`);
    }
  }

  async mintToken(tokenId: number, amount: number): Promise<{ hash: string }> {
    try {
      const adminAddress = this.configService.walletAddress;
      const adminPrivateKey = this.configService.walletPrivateKey;

      if (!adminPrivateKey) {
        throw new Error('Admin private key is not configured');
      }

      const account = new Account(
        this.provider,
        adminAddress,
        adminPrivateKey,
        '1',
      );
      this.logger.log(
        `Minting ${amount} token(s) with ID ${tokenId} to ${adminAddress}`,
      );

      const tx = await account.execute([
        {
          contractAddress: this.contract.address,
          entrypoint: 'mint',
          calldata: [adminAddress, tokenId, 0, amount, 0, 0],
        },
      ]);

      const receipt = await this.provider.waitForTransaction(
        tx.transaction_hash,
      );
      if ((receipt as any).execution_status !== 'SUCCEEDED') {
        throw new Error(
          `Transaction failed with status: ${(receipt as any).execution_status}`,
        );
      }

      this.logger.log(
        `Minted ${amount} token(s) with ID ${tokenId} to ${adminAddress}. Transaction hash: ${tx.transaction_hash}`,
      );
      return { hash: tx.transaction_hash };
    } catch (error) {
      this.logger.error(`Error minting token: ${error.message}`, error.stack);
      throw new Error(`Failed to mint token ${tokenId}: ${error.message}`);
    }
  }

  async transferNFT(transferDto: TransferDto): Promise<{ hash: string }> {
    try {
      const { to, tokenId, amount } = transferDto;
      const adminAddress = this.configService.walletAddress;
      const adminPrivateKey = this.configService.walletPrivateKey;

      if (!adminPrivateKey) {
        throw new Error('Admin private key is not configured');
      }

      const account = new Account(
        this.provider,
        adminAddress,
        adminPrivateKey,
        '1',
      );
      this.logger.log(
        `Transferring token ${tokenId} from ${adminAddress} to ${to}`,
      );

      const tx = await account.execute([
        {
          contractAddress: this.configService.contractAddress,
          entrypoint: 'safe_transfer_from',
          calldata: [adminAddress, to, tokenId, '0', amount, '0', '0'],
        },
      ]);

      this.logger.log(
        `Transfer successful. Transaction hash: ${tx.transaction_hash}`,
      );
      return { hash: tx.transaction_hash };
    } catch (error) {
      this.logger.error(
        `Error transferring NFT: ${error.message}`,
        error.stack,
      );
      throw new Error(
        `Failed to transfer token ${transferDto.tokenId}: ${error.message}`,
      );
    }
  }
}
