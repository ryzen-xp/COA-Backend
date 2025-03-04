import { Test, TestingModule } from '@nestjs/testing';
import { StarknetService } from './starknet.service';
import { ConfigService } from '@/common/config.service';
import { TransferDto } from '../dtos/transfer.dto';

// Mock the ConfigService
const mockConfigService = {
  contractAddress: "0x040811bb6636316c9f1809e2898285976d2a0db66e33703defbfb0c7572b87ad",
  walletAddress: "0x066EE9d5F6791270d7cD1314ddB9fc8f7EdCb59E2847e2b13D57A06e7c988D63",
  walletPrivateKey: "0x0363c39930af5bfd1890d94963a503fec02cc4965080517dc2888c1671a5e25a",
  starknetNetwork: "sepolia-alpha",
  getNodeUrl: jest.fn().mockReturnValue("https://starknet-sepolia.public.blastapi.io")
};

// Create a mock contract object with all required methods
const mockContract = {
  call: jest.fn().mockImplementation((method, args) => {
    if (method === "balance_of") {
      return [{ low: BigInt(100), high: BigInt(0) }];
    } else if (method === "uri") {
      return [{ data: ["68747470733a2f2f6578616d706c652e636f6d2f6e66742e6a7067"] }];
    }
    return [];
  }),
  callStatic: {
    uri: jest.fn().mockResolvedValue("https://example.com/nft.jpg")
  },
  address: "0x040811bb6636316c9f1809e2898285976d2a0db66e33703defbfb0c7572b87ad"
};

// Mock the starknet module
jest.mock('starknet', () => {
  return {
    RpcProvider: jest.fn().mockImplementation(() => ({
      getBlock: jest.fn().mockResolvedValue({ block_hash: "0x1234" }),
      waitForTransaction: jest.fn().mockResolvedValue({ execution_status: 'SUCCEEDED' })
    })),
    Account: jest.fn().mockImplementation(() => ({
      execute: jest.fn().mockResolvedValue({ transaction_hash: '0xabcd1234' })
    })),
    Contract: jest.fn().mockImplementation(() => {
      return {
        typedv2: jest.fn().mockReturnValue(mockContract),
        call: mockContract.call,
        callStatic: mockContract.callStatic,
        address: mockContract.address
      };
    })
  };
});

jest.mock('@/common/Abi', () => {
  return [];
});

describe('StarknetService', () => {
  let service: StarknetService;

  const TEST_ACCOUNT = "0x040811bb6636316c9f1809e2898285976d2a0db66e33703defbfb0c7572b87ad"; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarknetService,
        {
          provide: ConfigService,
          useValue: mockConfigService
        }
      ],
    }).compile();

    service = module.get<StarknetService>(StarknetService);
    
    await service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('transferNFT', () => {
    it('should transfer a single token successfully', async () => {
      const transferDto: TransferDto = {
        to: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        tokenId: '1'
      };

      const result = await service.transferNFT(transferDto);
      
      expect(result).toBeDefined();
      expect(result.hash).toBe('0xabcd1234');
    });

    it('should transfer multiple tokens successfully', async () => {
      const transferDto: TransferDto = {
        to: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        tokenId: '1',
        amount: 5
      };

      const result = await service.transferNFT(transferDto);
      
      expect(result).toBeDefined();
      expect(result.hash).toBe('0xabcd1234');
    });

    it('should throw an error with invalid recipient address', async () => {
      const transferDto: TransferDto = {
        to: 'invalid-address',
        tokenId: '1'
      };

      await expect(service.transferNFT(transferDto)).rejects.toThrow('Invalid recipient address');
    });

    it('should throw an error when trying to transfer more tokens than available', async () => {
      // Mock the getBalance method
      jest.spyOn(service, 'getBalance').mockResolvedValueOnce({
        account: TEST_ACCOUNT,
        tokenId: '1',
        balance: 5
      });

      const transferDto: TransferDto = {
        to: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        tokenId: '1',
        amount: 10
      };

      await expect(service.transferNFT(transferDto)).rejects.toThrow('Insufficient token balance');
    });

    it('should throw an error when transaction confirmation fails', async () => {
      // Mock the provider
      const mockProvider = {
        waitForTransaction: jest.fn().mockResolvedValue({ execution_status: 'REJECTED' })
      };
      
      //private provider property
      Object.defineProperty(service, 'provider', {
        value: mockProvider,
        writable: true
      });

      const transferDto: TransferDto = {
        to: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        tokenId: '1'
      };

      await expect(service.transferNFT(transferDto)).rejects.toThrow('Transaction failed with status');
    });
  });
});