import {
  EIGENPOD_MANAGER_ABI,
  EIGNEPOD_MANAGER_ADDRESS,
} from "@/constants/EigenPodManager";
import { decodeFunctionResult, PublicClient, WalletClient } from "viem";

export const deployEigenPod = async (
  publicClient: PublicClient,
  walletClient: WalletClient
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      account: walletClient.account,
      address: EIGNEPOD_MANAGER_ADDRESS,
      abi: EIGENPOD_MANAGER_ABI,
      functionName: "createPod",
    });

    const hash = await walletClient.writeContract(request);
    console.log("hash", hash);

    const txReciept = await publicClient.waitForTransactionReceipt({
      hash: hash,
    });

    const podAddress = decodeFunctionResult({
      abi: EIGENPOD_MANAGER_ABI,
      functionName: "createPod",
      data: result,
    });

    return {
      txHash: hash,
      txReciept: txReciept,
      eigenPodAddress: podAddress,
    };
  } catch (error) {
    console.error(error);
  }
};
