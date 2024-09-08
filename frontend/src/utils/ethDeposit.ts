import { DEPOSIT_ABI, DEPOSIT_ADDRESS } from "@/constants/BeaconChainDeposit";
import { parseEther, parseUnits, PublicClient, WalletClient } from "viem";

export const depositETH = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  depositData: any
) => {
  try {
    const { request } = await publicClient.simulateContract({
      account: walletClient.account,
      address: DEPOSIT_ADDRESS,
      abi: DEPOSIT_ABI,
      functionName: "deposit",
      args: [
        `0x${depositData.pubkey}`,
        `0x${depositData.withdrawal_credentials}`,
        `0x${depositData.signature}`,
        `0x${depositData.deposit_data_root}`,
      ],
      value: parseUnits(`${depositData.amount}`, 9),
    });

    const hash = await walletClient.writeContract(request);
    console.log("hash", hash);

    const txReciept = await publicClient.waitForTransactionReceipt({
      hash: hash,
    });

    return {
      txHash: hash,
      txReciept: txReciept,
      pubKey: depositData.pubkey,
    };
  } catch (error) {
    console.error(error);
  }
};
