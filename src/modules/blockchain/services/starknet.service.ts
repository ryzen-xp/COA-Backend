import { Injectable } from '@nestjs/common';
import { RpcProvider, Contract } from 'starknet';
import { ConfigService } from '../../../common/config.service';
import { NFTBalanceDto, NFTMetadataDto } from '../dtos/nft.dto';

@Injectable()
export class StarknetService {  
  private provider: RpcProvider;
  private contract: Contract;

  constructor(private readonly configService: ConfigService) {
    const networkUrls: Record<string, string> = {
      'mainnet-alpha': 'https://alpha-mainnet.starknet.io',
      'goerli-alpha': 'https://alpha4.starknet.io',
    };

    const nodeUrl = this.configService.starknetNetwork
      ? networkUrls[this.configService.starknetNetwork] || this.configService.starknetNetwork
      : "https://alpha4.starknet.io"; // Default a Goerli si no está definido

    if (!this.configService.contractAddress) {
      throw new Error("Contract address is not defined in ConfigService");
    }

    if (!this.configService.walletAddress) {
      throw new Error("Wallet address is not defined in ConfigService");
    }

    this.provider = new RpcProvider({ nodeUrl });

    try {
      this.initializeContract();
    } catch (error) {
      console.error("Error initializing contract:", error.message);
    }
  }

  private initializeContract(): void {
    const contractAddress = this.configService.contractAddress;

    const contractAbi = [
      {
        "name": "balance_of",
        "type": "function",
        "inputs": [
          { "name": "account", "type": "core::starknet::contract_address::ContractAddress" },
          { "name": "token_id", "type": "core::integer::u256" }
        ],
        "outputs": [{ "type": "core::integer::u256" }],
        "state_mutability": "view"
      },
      {
        "name": "uri",
        "type": "function",
        "inputs": [{ "name": "token_id", "type": "core::integer::u256" }],
        "outputs": [{ "type": "core::byte_array::ByteArray" }],
        "state_mutability": "view"
      }
    ];

    this.contract = new Contract(contractAbi, contractAddress, this.provider);
  }

  async getBlock(): Promise<any> {
    try {
      return await this.provider.getBlock('latest');
    } catch (error) {
      console.error("Error fetching latest block:", error.message);
      throw new Error("Failed to fetch latest block");
    }
  }

  async getContractStatus(): Promise<any> {
    try {
      const tokenId = { low: BigInt(1), high: BigInt(0) };
      const balance = await this.contract.call('balance_of', [
        BigInt(this.configService.walletAddress), 
        tokenId
      ]);
      return balance;
    } catch (error) {
      console.error(`Error fetching contract status: ${error.message}`);
      throw new Error("Failed to fetch contract status");
    }
  }

  async getBalance(account: string, tokenId: string): Promise<NFTBalanceDto> {
    try {
      const balance = await this.contract.call("balance_of", [
        BigInt(account),
        { low: BigInt(tokenId), high: BigInt(0) }
      ]);

      return { account, tokenId, balance: Number(balance[0].low) };
    } catch (error) {
      console.error(`Error fetching balance: ${error.message}`);
      throw new Error("Failed to fetch balance");
    }
  }

  async getTokenURI(tokenId: string): Promise<NFTMetadataDto> {
    try {
      const uriResponse = await this.contract.call("uri", [
        { low: BigInt(tokenId), high: BigInt(0) }
      ]);

      if (!uriResponse || !uriResponse[0]?.data) {
        throw new Error(`No metadata found for token ID ${tokenId}`);
      }

      const uriData = uriResponse[0].data.map((felt: any) => Buffer.from(felt, 'hex').toString()).join('');
      return { tokenId, uri: uriData };
    } catch (error) {
      console.error(`Error fetching token URI: ${error.message}`);
      throw new Error(`Failed to fetch token URI for ID ${tokenId}`);
    }
  }
}
