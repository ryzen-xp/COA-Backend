import { Injectable } from '@nestjs/common';
import { RpcProvider, Contract } from 'starknet';
import { ConfigService } from '../../../common/config.service';

@Injectable()
export class StarknetService {  
  private provider: RpcProvider;
  private contract: Contract;

  constructor(private readonly configService: ConfigService) {
    const networkUrls: Record<string, string> = {
      'mainnet-alpha': 'https://alpha-mainnet.starknet.io',
      'goerli-alpha': 'https://alpha4.starknet.io',
    };

    const nodeUrl = networkUrls[this.configService.starknetNetwork] || this.configService.starknetNetwork;

    this.provider = new RpcProvider({ nodeUrl });

    this.initializeContract();
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
      }
    ];

    this.contract = new Contract(contractAbi, contractAddress, this.provider);
  }

  async getBlock(): Promise<any> {
    return this.provider.getBlock('latest');
  }

  async getContractStatus(): Promise<any> {
    const tokenId = { low: '0x1', high: '0x0' };

    const balance = await this.contract.call('balance_of', [
      BigInt(this.configService.walletAddress), 
      tokenId
    ]);

    return balance;
  }
}
