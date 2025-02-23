import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get contractAddress(): string {
    return this.configService.get<string>('blockchain.contractAddress')!;
  }

  get walletAddress(): string {
    return this.configService.get<string>('blockchain.walletAddress')!;
  }

  get walletPrivateKey(): string {
    return this.configService.get<string>('blockchain.walletPrivateKey')!;
  }

  get starknetNetwork(): string {
    return this.configService.get<string>('blockchain.starknetNetwork')!;
  }

  /**
   * Get the RPC node URL based on the network
   */
  getNodeUrl(): string {
    const networkUrls: Record<string, string> = {
      'mainnet-alpha': 'https://alpha-mainnet.starknet.io',
      'goerli-alpha': 'https://alpha4.starknet.io',
    };

    const network = this.starknetNetwork;
    return networkUrls[network] || network;
  }
}
