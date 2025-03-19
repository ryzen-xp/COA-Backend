import dotenv from 'dotenv';

dotenv.config();

export class Config {
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

  /**
   * Get the RPC node URL based on the network
   */
  getNodeUrl(): string {
    const networkUrls: Record<string, string> = {
      'mainnet-alpha': 'https://alpha-mainnet.starknet.io',
      'goerli-alpha': 'https://alpha4.starknet.io',
      'sepolia-alpha': 'https://starknet-sepolia.public.blastapi.io',
    };

    const network = this.starknetNetwork;
    return networkUrls[network] || network;
  }
}

export const config = new Config();
