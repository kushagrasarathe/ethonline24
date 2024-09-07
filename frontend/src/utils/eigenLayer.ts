"use client";

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

    console.log("request", request);

    const hash = await walletClient.writeContract(request);
    console.log("hash", hash);

    const txReciept = await publicClient.waitForTransactionReceipt({
      hash: hash,
    });

    return {
      txHash: hash,
      txReciept: txReciept,
      eigenPodAddress: result,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getEigenPod = async (
  publicClient: PublicClient,
  userAddress: `0x${string}`
) => {
  try {
    const hasPod = await publicClient.readContract({
      address: EIGNEPOD_MANAGER_ADDRESS,
      abi: EIGENPOD_MANAGER_ABI,
      functionName: "hasPod",
      args: [userAddress],
    });

    console.log("hasPod", hasPod);

    if (!hasPod) {
      return null;
    }

    const podAddress = await publicClient.readContract({
      address: EIGNEPOD_MANAGER_ADDRESS,
      abi: EIGENPOD_MANAGER_ABI,
      functionName: "getPod",
      args: [userAddress],
    });

    return podAddress;
  } catch (error) {
    console.error(error);
  }
};
