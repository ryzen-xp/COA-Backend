import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { BlockchainModule } from './modules/blockchain/blockchain.module';

const routes: Routes = [
  {
    path: 'starknet',
    module: BlockchainModule,
  },
];

@Module({
  imports: [RouterModule.register(routes)],
  exports: [RouterModule],
})
export class StarknetRouterModule {}
