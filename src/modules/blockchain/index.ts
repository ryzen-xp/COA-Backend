import express, { Request, Response } from 'express';
import Contract from './starknetContract';

const app = express();

app.use(express.json());

app.get('/block', async (req: Request, res: Response) => {
  try {
    const block = await Contract.getBlock();
    res.status(200).json(block);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

app.get('/contract-status', async (req: Request, res: Response) => {
  try {
    const status = await Contract.getContractStatus();
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

app.get('/balance/:account/:tokenId', async (req: Request, res: Response) => {
  const { account, tokenId } = req.params;
  try {
    const balance = await Contract.getBalance(account, tokenId);
    res.status(200).json(balance);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

app.get('/token/:tokenId', async (req: Request, res: Response) => {
  const { tokenId } = req.params;
  try {
    const metadata = await Contract.getTokenURI(tokenId);
    res.status(200).json(metadata);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

app.post('/mint', async (req: Request, res: Response) => {
  const { tokenId, amount } = req.body;
  try {
    const response = await Contract.mintToken(tokenId, amount);
    res.status(200).json({
      message: 'Token minted successfully',
      hash: response,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Minting failed: ${(error as Error).message}` });
  }
});

app.post('/transfer', async (req: Request, res: Response) => {
  const { to, tokenId, amount } = req.body;
  try {
    const response = await Contract.transferNFT(to, tokenId, amount);
    res.status(200).json({
      message: 'Token transferred successfully',
      hash: response,
    });
  } catch (error) {
    res.status(500).json({
      message: `Transfer failed: ${(error as Error).message}`,
    });
  }
});

export default app;
