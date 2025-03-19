import { Contract, RpcProvider, Account } from 'starknet';
import { config } from '../../common/config';
import erc1155Abi from '../../common/Abi';

const utils = {
  initializeProvider() {
    const provider = new RpcProvider({ nodeUrl: config.getNodeUrl() });
    return provider;
  },

  initializeContract() {
    const provider = this.initializeProvider();
    const contract = new Contract(erc1155Abi, config.contractAddress, provider);
    return contract;
  },

  initializeAccount() {
    const provider = this.initializeProvider();
    const account = new Account(
      provider,
      config.walletAddress,
      config.walletPrivateKey,
      undefined,
      '0x3',
    );
    return account;
  },
};

export default utils;
