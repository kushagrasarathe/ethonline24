import {
  SSV_NETWORK_VIEWS_ABI,
  SSV_NETWORK_VIEWS_ADDRESS,
} from "@/constants/SSVNetworkViews";
import {
  createPublicClient,
  createWalletClient,
  formatUnits,
  http,
  parseUnits,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { holesky } from "viem/chains";

export const getSSVFees = async () => {
  const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);

  const publicClient = createPublicClient({
    transport: http(`https://1rpc.io/holesky`),
  });
  const walletClient = createWalletClient({
    chain: holesky,
    transport: http(`https://1rpc.io/holesky`),
    account: account,
  });

  try {
    const networkFee = await publicClient.readContract({
      address: SSV_NETWORK_VIEWS_ADDRESS,
      abi: SSV_NETWORK_VIEWS_ABI,
      functionName: "getNetworkFee",
    });
    console.log("Network Fee", networkFee); // for 1 block

    // 1 block => 12 seconds
    // for 6 months => 5*24*30*6 = 21600 blocks => 0.5 SSV
    // for 1 year => 5*24*30*12 = 43200 blocks => 1 SSV

    // console.log("Network Fee for 6 months", networkFeeFor6Months);

    const liquidationThresholdPeriod = await publicClient.readContract({
      address: SSV_NETWORK_VIEWS_ADDRESS,
      abi: SSV_NETWORK_VIEWS_ABI,
      functionName: "getLiquidationThresholdPeriod",
    });

    console.log(
      "Liquidation Threshold Period",
      formatUnits(liquidationThresholdPeriod, 0)
    );

    // 1 SSV
    const minLiquidationCollateral = await publicClient.readContract({
      address: SSV_NETWORK_VIEWS_ADDRESS,
      abi: SSV_NETWORK_VIEWS_ABI,
      functionName: "getMinimumLiquidationCollateral",
    });

    console.log(
      "Minimum Liquidation Collateral",
      formatUnits(minLiquidationCollateral, 18)
    );
  } catch (error) {
    console.error(error);
  }
};

export const calculateOperatorFees = (operatorFee: string) => {
  try {
    const Calculated = Number(operatorFee) * 5 * 60 * 24 * 365;
    const formattedFee = formatUnits(BigInt(Calculated), 18);
    return Number(formattedFee).toFixed(1);
  } catch (error) {
    console.error(error);
  }
};
