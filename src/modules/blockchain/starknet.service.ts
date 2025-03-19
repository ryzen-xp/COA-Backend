import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { RpcProvider, Contract, Account, cairo } from 'starknet';
import { ConfigService } from '@/common/config.service';
import { StarknetUtils } from './starknet.utils';

@Injectable()
export class StarknetService implements OnModuleInit {
  private readonly logger = new Logger(StarknetService.name);
  private provider: RpcProvider;
  private contract: Contract;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    try {
      this.provider = StarknetUtils.initializeProvider(this.configService);
      this.contract = StarknetUtils.initializeContract(
        this.provider,
        this.configService,
      );
    } catch (error) {
      this.logger.error('Failed to initialize Starknet service', error);
      throw error;
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

  async getBalance(account: string, tokenId: string): Promise<any> {
    try {
      const balance = await this.contract.call('balance_of', [
        BigInt(account),
        { low: BigInt(tokenId), high: BigInt(0) },
      ]);
      return {
        account,
        tokenId,
        balance: JSON.parse(
          JSON.stringify(balance, (_, v) =>
            typeof v === 'bigint' ? v.toString() : v,
          ),
        ),
      };
    } catch (error) {
      this.logger.error(`Error fetching balance: ${error.message}`);
      throw new Error('Failed to fetch balance');
    }
  }

  async getTokenURI(tokenId: string): Promise<any> {
    try {
      const uriResponse = await this.contract.callStatic.uri({
        low: BigInt(tokenId),
        high: BigInt(0),
      });
      return { tokenId, uri: uriResponse || '' };
    } catch (error) {
      this.logger.error(`Error fetching token URI: ${error.message}`);
      throw new Error(`Failed to fetch token URI for ID ${tokenId}`);
    }
  }

  async mintToken(tokenId: string, amount: number): Promise<{ hash: string }> {
    try {
      const account = StarknetUtils.initializeAccount(
        this.provider,
        this.configService,
      );
      this.logger.log(`Minting ${amount} token(s) with ID ${tokenId}`);

      const mintCall = {
        contractAddress: this.contract.address,
        entrypoint: 'mint',
        calldata: [
          this.configService.walletAddress,
          cairo.uint256(BigInt(tokenId)),
          cairo.uint256(BigInt(amount)),
          0,
        ],
      };

      const { transaction_hash: mintTxHash } = await account.execute(mintCall);
      await this.provider.waitForTransaction(mintTxHash);

      this.logger.log(`Minting successful. Transaction hash: ${mintTxHash}`);
      return { hash: mintTxHash };
    } catch (error) {
      this.logger.error(`Error minting token: ${error.message}`, error.stack);
      throw new Error(`Failed to mint token ${tokenId}: ${error.message}`);
    }
  }

  async transferNFT(
    to: string,
    tokenId: string,
    amount: number,
  ): Promise<{ hash: string }> {
    try {
      const account = StarknetUtils.initializeAccount(
        this.provider,
        this.configService,
      );
      const balance = await this.getBalance(
        this.configService.walletAddress,
        tokenId,
      );

      if (BigInt(balance.balance) === BigInt(0)) {
        throw new Error(`Sender does not own token ${tokenId}`);
      }

      this.logger.log(`Transferring token ${tokenId} to ${to}`);

      const tx = await account.execute([
        {
          contractAddress: this.configService.contractAddress,
          entrypoint: 'safe_transfer_from',
          calldata: [
            this.configService.walletAddress,
            to,
            tokenId,
            '0',
            amount,
            '0',
            '0',
          ],
        },
      ]);

      return { hash: tx.transaction_hash };
    } catch (error) {
      this.logger.error(`Error transferring NFT: ${error.message}`);
      throw new Error(`Failed to transfer token ${tokenId}: ${error.message}`);
    }
  }
}
