import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const blockchainConfig = registerAs('blockchain', () => ({
  contractAddress: process.env.CONTRACT_ADDRESS,
  walletAddress: process.env.WALLET_ADDRESS,
  walletPrivateKey: process.env.WALLET_PRIVATE_KEY,
  starknetNetwork: process.env.STARKNET_NETWORK || 'sepolia-alpha',
}));

export const blockchainValidationSchema = Joi.object({
  CONTRACT_ADDRESS: Joi.string().required(),
  WALLET_ADDRESS: Joi.string().required(),
  WALLET_PRIVATE_KEY: Joi.string().required(),
  STARKNET_NETWORK: Joi.string()
    .valid('mainnet-alpha', 'goerli-alpha', 'sepolia-alpha')
    .default('sepolia-alpha'),
});
