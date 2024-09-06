import { SSV_TOKEN_ABI, SSV_TOKEN_ADDRESS } from "@/constants/SSVToken";
import {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  PublicClient,
  WalletClient,
} from "viem";
import { SSVKeys, KeyShares, KeySharesItem, SSVKeysException } from "ssv-keys";
import { SSV_NETWORK_ABI, SSV_NETWORK_ADDRESS } from "@/constants/SSVNetwork";
import { NonceScanner } from "ssv-scanner";
import keystore from "./test.keystore.json";
import { privateKeyToAccount } from "viem/accounts";
import { holesky } from "viem/chains";
import axios from "axios";

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

    keySharesItem.update({
      ownerAddress: walletClient.account?.address!,
      ownerNonce: ownerNonce,
      operators,
      publicKey,
    });

    keyShares.add(keySharesItem);

    console.log(payload);
    console.log(keyShares.toJson());
    return payload;
  } catch (error) {
    console.log(error);
  }
};

// Register Validator
export const registerValidator = async (
  publicClient: PublicClient,
  walletClient: WalletClient,
  payload: any
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
        parseEther("1.5"),
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
    nodeUrl: "https://1rpc.io/holesky", // this can be an Infura, or Alchemy node, necessary to query the blockchain
    contractAddress: SSV_NETWORK_ADDRESS,
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
  walletClient: WalletClient
) => {
  try {
    const data = await publicClient.readContract({
      address: SSV_TOKEN_ADDRESS,
      abi: SSV_TOKEN_ABI,
      functionName: "balanceOf",
      args: [walletClient.account?.address!],
    });

    const { request, result } = await publicClient.simulateContract({
      account: walletClient.account,
      address: SSV_TOKEN_ADDRESS,
      abi: SSV_TOKEN_ABI,
      functionName: "approve",
      args: [SSV_NETWORK_ADDRESS, data],
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

// 4. Fetch SSV token Fees amount

// const main = async () => {
//   const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);

//   const publicClient = createPublicClient({
//     transport: http(`https://eth-holesky.g.alchemy.com/v2/`),
//   });
//   const walletClient = createWalletClient({
//     chain: holesky,
//     transport: http(`https://eth-holesky.g.alchemy.com/v2/`),
//     account: account,
//   });

//   const operatorKeys = [
//     "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBdHhHZEx6QVBnR0hhYWVoYUN6a0YKTmdiSmZ6WndCQnlsVFhMdWxPc3ErMzA2NCtBUFNQZHh3YmVXalpPRWpvWC9rRy9EaHNUVmw5eGw0SktUdWxpQwpYdlpMZXRpd3ZuM3RYQTFTKzNGTnJLZ1FjNFBnSHppd1RKL01yMEdyRzFyYWpvYm9VMGVETU5Hbi8zL3BRdk1WCks5bFNuY1QyaFhLbW1PdDdtQUUyK3ltT0JOZDhKU3g5NnA3ajFWdDNwc2d4ZzJMTUU0Nnd2dEpPVyswUWdNVDMKSDNEVjVSTWZWUlU4Z29nUFptbjNYRUR4RUJLZUtmaFZHVjlYNmFhcXkvU2Y4aEo3aG16eVcrQ3F1bkFYYWUySwo5ZDdSL0g0dStZcGovaU5NYkNQNi9GOGlIOCtQbWRyTmtUUFRPakwrb05HZVlNSVB3L1hYVStZbkhzcGp4SjRMCnBRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
//     "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBeFArYkhwYS85WlhJUkJUR0JFWmcKN2hxa1Rra0VRUnZnTFJTV0E3K2cwbHkvVlpUczlFVTBjcXZFNURvUmxseVhrTHNVcnplOTZaOFJPNllmNC9LZQpta3hudk1YeHFUanlITGNkWlhIN1pFMmhWUnZRRVA3TE9hL3RCRHFYYVlHVklZbEYwWWIrVlFhSUczbGg4QmpCClN2ZE9rVERwblJLU1g2Z0ZnTTZVMy9FcFQyVlZRR1Y3VjIrNTF0YlM4WGJpUVQ3OTdwZmpBVEU4VmZseXBPUFIKYU5PREpjWnBlWjFjR0JCMWVJTUlGMlFGMFBCdGQzZ1ZVbDU5RFBHRFRZSUh2VnRrdkhSVHR3a1hOS2EveXV3SApnb1JhZjE4SDZTRy9vazFUM0l4WFYwdk1GdGlvUDJGWVh6UlNzaDBTcnlBR255azB0MElKb0JPMzBtZjFUeXZxCmN3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
//     "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBem9hb09qQWIvVTQ3QitTWit6WUYKcm5TNHBMbUZnL2RYc3pCYWpaSm5zTWJoSzZISHFCdnZwRXZHWHpsU1Q3R3lWTDVQbzVaNEVSQzdPdXBHK2JQWQptQTgwNXZPb3FqYmNkVVlwclgyb1c4K1V1aFZJdUwyd2QvQXJqRDFScUc5eUV6WkRuUVdDdmplaElTQ1NXWFNPCmppbWxTbkpPZTd1Z0hwOXJWRkh3bVlwNGQyOWRBWFc2YTJZdndDRm1oVE9mdUMrSVNESzJTck9JWC9hVnZ5ekgKMU1OY0VmUTNaSGxjYmZQMDdTMVNqN25WYWhqM1hVUEIyMDMxOTRpQU9zcVRaOVFuU3NUamtydGF1MW1SV21aMQpFNm9nYTNJQ2t0YWs5M2FqcElYV3JKUzMwVERtSDhPckpKanVoQm4zaXRrK1o1Szg5SEdXa3FLME1wN2tYOGxPCi93SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
//     "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBcWMwUjlWRm9pM1NIeDl2alppb1gKRllwNFhkRjB2emRRRjRLRnozVklYaU5US3Vzck5mSW0zSm1FbWlSQmw4RmRvTmliRC9SZFc1YkFRUzN1UE5MRApGdHZVZ2p3bXBFNEdvcUpmSXZSWENWK2ROamcyNDU5aW44UnlkK0FUbm5qZXRYYWFSN3JNUlIreDRrcVlONkR4CkZoc2llZGgrZG0xTXNtMTRzc2FhMmZ3TExXamlzMDhTZlJZcXhjVHVCd24zUzFFajUwZzVrRG1RRmVyWUxBY2EKSXFOaFNsc0ZJZE50dHFkMUdSR3o0SFFPQmcyQk9iWWdwNEhEZTFLb0xmREdyMHNzRWFZMnRoeVZZOE9FaHh3YgpwUE1NTEk3NmFpUHdJQUsyM1MzWHZLS3ZtRXc1T1FFM0ptWXJrRDFDMTdoRGNWdUxkODV4YnZFSUFENms3b0NJCnB3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
//   ];
//   const operatorIds = [123, 456, 789, 777];

//   await distributeKeys({
//     operatorKeys,
//     operatorIds,
//     keystoreFile: JSON.stringify(keystore),
//     keystorePassword: "testtest",
//     publicClient,
//     walletClient,
//   });
// };

// main();
