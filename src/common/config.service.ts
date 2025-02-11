import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get contractAddress(): string {
    return process.env.CONTRACT_ADDRESS!;
  }

  get walletAddress(): string {
    return process.env.WALLET_ADDRESS!;
  }

  get walletPrivateKey(): string {
    return process.env.WALLET_PRIVATE_KEY!;
  }

  get starknetNetwork(): string {
    return process.env.STARKNET_NETWORK!;
  }
}