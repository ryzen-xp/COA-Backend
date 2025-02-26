import { RpcProvider } from "starknet";
import "dotenv/config";

const provider = new RpcProvider({ 
    nodeUrl: "https://starknet-sepolia.public.blastapi.io" 
});

function formatBalance(hexBalance: string): string {
    const decimal = BigInt(hexBalance);
    const divisor = BigInt(10) ** BigInt(18);
    const formatted = decimal / divisor;
    return formatted.toString();
}

async function checkContractAndBalances() {
    if (!process.env.WALLET_ADDRESS) {
        console.error("Error: WALLET_ADDRESS not found in .env file");
        return;
    }

    const contractAddress = process.env.WALLET_ADDRESS;
    
    console.log("\nChecking Address:", contractAddress);
  
    try {
        console.log("\nNetwork Status");
        console.log("===============");
        const chainId = await provider.getChainId();
        console.log('Connected to Network:', chainId);

        console.log("\nToken Balances");
        console.log("===============");
        
        try {
            const ethContractAddress = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";
            const ethResult = await provider.callContract({
                contractAddress: ethContractAddress,
                entrypoint: "balanceOf",
                calldata: [contractAddress]
            });
            console.log(`ETH Balance: ${formatBalance(ethResult[0])} ETH`);
        } catch (error) {
            console.log("ETH Balance: Unable to fetch");
        }
        
        try {
            const strkContractAddress = "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";
            const strkResult = await provider.callContract({
                contractAddress: strkContractAddress,
                entrypoint: "balanceOf",
                calldata: [contractAddress]
            });
            console.log(`STRK Balance: ${formatBalance(strkResult[0])} STRK`);
        } catch (error) {
            console.log("STRK Balance: Unable to fetch");
        }
        
        console.log("\nView on Explorer");
        console.log("=================");
        console.log(`https://sepolia.starkscan.co/contract/${contractAddress}`);
        
        console.log("\n✅ Check Complete");

    } catch (error) {
        console.error("\n❌ Error in check");
        console.error("Error details:", error.message);
    }
}

checkContractAndBalances();