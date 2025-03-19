import { RpcProvider, Contract, Account } from 'starknet';
import { ConfigService } from '@/common/config.service';
import erc1155Abi from '@/common/Abi';
import { Logger } from '@nestjs/common';

export class StarknetUtils {
  private static readonly logger = new Logger(StarknetUtils.name);

  static initializeProvider(configService: ConfigService): RpcProvider {
    const nodeUrl = configService.getNodeUrl();
    this.logger.log(`initializing starknet provider -_-_-_-_`);
    return new RpcProvider({ nodeUrl });
  }

  static initializeContract(
    provider: RpcProvider,
    configService: ConfigService,
  ): Contract {
    const contractAddress = configService.contractAddress;
    if (!contractAddress) {
      throw new Error('Contract address is not defined in configuration');
    }

    try {
      const contract = new Contract(
        erc1155Abi,
        contractAddress,
        provider,
      ).typedv2(erc1155Abi);
      this.logger.log('successfully initialized Starknet contract =_=');
      return contract;
    } catch (error) {
      this.logger.error('Failed to initialize contract', error);
      throw new Error(
        'Failed to initialize Starknet contract: ' + error.message,
      );
    }
  }

  static initializeAccount(
    provider: RpcProvider,
    configService: ConfigService,
  ): Account {
    const adminAddress = configService.walletAddress;
    const adminPrivateKey = configService.walletPrivateKey;

    if (!adminAddress || !adminPrivateKey) {
      throw new Error('Admin wallet address or private key is not configured');
    }

    return new Account(
      provider,
      adminAddress,
      adminPrivateKey,
      undefined,
      '0x3',
    );
  }
}
