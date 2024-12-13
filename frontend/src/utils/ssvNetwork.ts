import { SSV_NETWORK_ABI, SSV_NETWORK_ADDRESS } from "@/constants/SSVNetwork";
import { SSV_TOKEN_ABI, SSV_TOKEN_ADDRESS } from "@/constants/SSVToken";
import axios from "axios";
import { KeyShares, KeySharesItem, SSVKeys } from "ssv-keys";
import { NonceScanner } from "ssv-scanner";
import { parseEther, PublicClient, WalletClient } from "viem";

// 1. Fetch all the available operators to be shown for creating the cluster
export const getSSVOperators = async ({ pageParam }: { pageParam: number }) => {
  try {
    // axios API call to fetch all the available operators
    // Fetch all the available operators
    const response = await axios.get(
      `https://api.ssv.network/api/v4/holesky/operators?ordering=id:asc&page=${pageParam}&perPage=10`
      // `https://api.ssv.network/api/v4/holesky/operators?page=1&perPage=${totalReqOperators}`
    );
    const operators = response.data.operators;
    return operators;
  } catch (error) {
    console.log(error);
  }
};

// 2. Create cluster and distribute keys transaction
interface DistibuteKeysParam {
  operatorKeys: string[];
  operatorIds: number[];
  keystoreFile: string;
  keystorePassword: string;
  publicClient: PublicClient;
  walletClient: WalletClient;
}

export const distributeKeys = async ({
  operatorKeys,
  operatorIds,
  keystoreFile,
  keystorePassword,
  walletClient,
}: DistibuteKeysParam) => {
  const ssvKeys = new SSVKeys();
  const keyShares = new KeyShares();
  const keySharesItem = new KeySharesItem();

  try {
    console.log(keystoreFile);
    console.log(keystorePassword);
    const { publicKey, privateKey } = await ssvKeys.extractKeys(
      keystoreFile,
      keystorePassword
    );

    const operators = operatorKeys.map((operator, index) => ({
      id: operatorIds[index],
      operatorKey: operator,
    }));

    const encryptedShares = await ssvKeys.buildShares(privateKey, operators);

    const ownerNonce = await getNextSSVNonce(walletClient.account?.address!);
    if (ownerNonce == undefined) {
      console.log("Error fetching nonce");
      return;
    }

    // Build final web3 transaction payload and update keyshares file with payload data
    const payload = await keySharesItem.buildPayload(
      {
        publicKey,
        operators,
        encryptedShares,
      },
      {
        ownerAddress: walletClient.account?.address!,
        ownerNonce: ownerNonce,
        privateKey,
      }
    );
    console.log("Payload", payload);

    keySharesItem.update({
      ownerAddress: walletClient.account?.address!,
      ownerNonce: ownerNonce,
      operators,
      publicKey,
    });

    keyShares.add(keySharesItem);

    return payload;
  } catch (error) {
    console.log(error);
  }
};

// Register Validator
export const registerValidator = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  payload: any,
  fees: number
) => {
  try {
    const { request } = await publicClient.simulateContract({
      account: walletClient.account,
      address: SSV_NETWORK_ADDRESS,
      abi: SSV_NETWORK_ABI,
      functionName: "registerValidator",
      args: [
        payload.publicKey,
        payload.operatorIds,
        payload.sharesData,
        parseEther(fees.toString()),
        {
          validatorCount: 0,
          networkFeeIndex: BigInt(0),
          index: BigInt(0),
          active: true,
          balance: BigInt(0),
        },
      ],
    });

    const hash = await walletClient.writeContract(request);
    console.log("hash", hash);

    const txReciept = await publicClient.waitForTransactionReceipt({
      hash: hash,
    });

    return {
      txHash: hash,
      txReciept: txReciept,
    };
  } catch (error) {
    console.log(error);
  }
};

// Get nonce
export const getNextSSVNonce = async (
  ownerAddress: string
): Promise<number | undefined> => {
  const params = {
    network: "holesky",
    nodeUrl:
      "https://eth-holesky.g.alchemy.com/v2/fRc3XT5tByDN2BAbXmrWCjBYtBb_Cq9Z", // this can be an Infura, or Alchemy node, necessary to query the blockchain
    ownerAddress: ownerAddress,
  };

  try {
    // NonceScanner is initialized with the given parameters
    const nonceScanner = new NonceScanner(params);
    // Return the owner nonce
    const nextNonce = await nonceScanner.run();
    console.log("Next Nonce:", nextNonce);
    return nextNonce;
  } catch (error) {
    console.log(error);
  }
};

// 3. Approve SSV Token for fees
export const approveSSVToken = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  fees: number
) => {
  try {
    const { request, result } = await publicClient.simulateContract({
      account: walletClient.account,
      address: SSV_TOKEN_ADDRESS,
      abi: SSV_TOKEN_ABI,
      functionName: "approve",
      args: [SSV_NETWORK_ADDRESS, parseEther(fees.toString())],
    });

    const hash = await walletClient.writeContract(request);
    console.log("hash", hash);

    const txReciept = await publicClient.waitForTransactionReceipt({
      hash: hash,
    });

    return {
      txHash: hash,
      txReciept: txReciept,
    };
  } catch (error) {
    console.error(error);
  }
};
