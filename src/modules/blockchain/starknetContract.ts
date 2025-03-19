import { cairo } from 'starknet';
import { config } from '../../common/config';
import utils from './utils';

const Contract = {
  async getBlock(): Promise<any> {
    return await utils.initializeProvider().getBlock('latest');
  },

  async getContractStatus(): Promise<any> {
    const tokenId = { low: BigInt(1), high: BigInt(0) };
    const walletAddress = BigInt(config.walletAddress);
    const balance = await utils
      .initializeContract()
      .call('balance_of', [walletAddress, tokenId]);
    return JSON.parse(
      JSON.stringify(balance, (_, v) =>
        typeof v === 'bigint' ? v.toString() : v,
      ),
    );
  },

  async getBalance(account: string, tokenId: string): Promise<any> {
    const balance = await utils
      .initializeContract()
      .call('balance_of', [
        BigInt(account),
        { low: BigInt(tokenId), high: BigInt(0) },
      ]);
    return JSON.parse(
      JSON.stringify(balance, (_, v) =>
        typeof v === 'bigint' ? v.toString() : v,
      ),
    );
  },

  async getTokenURI(tokenId: string): Promise<any> {
    const uriResponse = await utils.initializeContract().callStatic.uri({
      low: BigInt(tokenId),
      high: BigInt(0),
    });
    return uriResponse;
  },

  async mintToken(tokenId: string, amount: number): Promise<string> {
    const account = utils.initializeAccount();
    const mintCall = {
      contractAddress: utils.initializeContract().address,
      entrypoint: 'mint',
      calldata: [
        config.walletAddress,
        cairo.uint256(BigInt(tokenId)),
        cairo.uint256(BigInt(amount)),
        0,
      ],
    };

    const { transaction_hash: mintTxHash } = await account.execute(mintCall);
    await utils.initializeProvider().waitForTransaction(mintTxHash);
    return mintTxHash;
  },

  async transferNFT(
    to: string,
    tokenId: string,
    amount: number,
  ): Promise<string> {
    const account = utils.initializeAccount();
    const balance = await this.getBalance(config.walletAddress, tokenId);

    if (BigInt(balance) === BigInt(0)) {
      throw new Error(`Sender does not have token ${tokenId}`);
    }

    const tx = await account.execute([
      {
        contractAddress: config.contractAddress,
        entrypoint: 'safe_transfer_from',
        calldata: [config.walletAddress, to, tokenId, '0', amount, '0', '0'],
      },
    ]);

    return tx.transaction_hash;
  },
};

export default Contract;
