import { Controller, Get } from '@nestjs/common';
import { StarknetService } from '../services/starknet.service';

@Controller('starknet')
export class StarknetController {
  constructor(private readonly starknetService: StarknetService) {}

  @Get('block')
  async getLatestBlock(): Promise<any> {
    return await this.starknetService.getBlock();
  }
}
