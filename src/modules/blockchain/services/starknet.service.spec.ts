import { Test, TestingModule } from '@nestjs/testing';
import { StarknetService } from './starknet.service';
import { ConfigService } from '../../../common/config.service';

describe('StarknetService', () => {
  let service: StarknetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarknetService, ConfigService],
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

  it('should retrieve contract status', async () => {
    const balance = await service.getContractStatus();
    expect(balance).toBeDefined();
  });
});
