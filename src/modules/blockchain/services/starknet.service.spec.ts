import { Test, TestingModule } from '@nestjs/testing';
import { StarknetService } from './starknet.service';
import { ConfigService } from '../../../common/config.service';

jest.mock('starknet', () => ({
  RpcProvider: jest.fn().mockImplementation(() => ({
    getBlock: jest.fn().mockResolvedValue({ block_hash: "0x1234" })
  })),
  Contract: jest.fn().mockImplementation(() => ({
    call: jest.fn()
      .mockImplementation((method, args) => {
        if (method === "balance_of") {
          return [{ low: BigInt(5), high: BigInt(0) }];
        } else if (method === "uri") {
          return [{ data: ["68747470733a2f2f6578616d706c652e636f6d2f6e66742e6a7067"] }];
        }
      })
  }))
}));

describe('StarknetService', () => {
  let service: StarknetService;

  const TEST_ACCOUNT = "0x040811bb6636316c9f1809e2898285976d2a0db66e33703defbfb8c7572b87ad"; 
  const TEST_CONTRACT = "0x040811bb6636316c9f1809e2898285976d2a0db66e33703defbfb8c7572b87ad";

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarknetService,
        {
          provide: ConfigService,
          useValue: {
            starknetNetwork: "goerli-alpha",
            contractAddress: TEST_CONTRACT,
            walletAddress: TEST_ACCOUNT,
          }
        }
      ],
    }).compile();

    service = module.get<StarknetService>(StarknetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch latest block', async () => {
    const block = await service.getBlock();
    expect(block).toHaveProperty('block_hash');
  });

  it('should fetch NFT balance', async () => {
    const balance = await service.getBalance(TEST_ACCOUNT, "1");
    expect(balance.balance).toBeGreaterThanOrEqual(0);
  });

  it('should fetch NFT metadata', async () => {
    const metadata = await service.getTokenURI("1");
    expect(metadata.uri).toContain("https://example.com/nft.jpg");
  });
});
 