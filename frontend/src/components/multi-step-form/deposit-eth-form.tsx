"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { useAppStore } from "@/redux/hooks";
import Link from "next/link";
import { ButtonIcon } from "../ui/button-icon";
import { depositETH } from "@/utils/ethDeposit";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export default function DepositEthForm() {
  const { selectedOperators, depositDataFile } = useAppStore();
  const [isDepositing, setIsDepositing] = React.useState(false);
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const handleDepositETH = async () => {
    setIsDepositing(true);
    try {
      if (!depositDataFile) {
        throw new Error("Deposit data file not found");
      }

      const depositData = JSON.parse(depositDataFile);
      console.log("Deposit data: ", depositData);

      if (!publicClient || !walletClient?.account) {
        return;
      }

      const depositDataFor1 = depositData[0];
      const tx = await depositETH(publicClient, walletClient, depositDataFor1);
      console.log(`Deposit transaction hash: ${tx?.txHash}`);
      setIsDepositing(false);
    } catch (error) {
      console.error(error);
      setIsDepositing(false);
    }
  };

  return (
    <div className="w-full space-y-5 md:max-w-xl">
      <div className="space-y-4 text-center">
        <div className="text-2xl font-bold text-primary">
          Congrats your validator is ready to stake!
        </div>
        {/* <svg
          className="checkmark mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />{" "}
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg> */}
        <p className="text-gray-600 text-sm font-semibold">
          Final step is to stake your ETH to Beacon chain to activate your
          validator. It generally takes up to 24 hours for the deposit to be
          processed by the beacon chain, post which the validator will be
          active.
          <br />
          <br />
          Your new validator is managed by the following cluster. Your cluster
          operators have been notified and will start your validator operations
          shortly.
        </p>
        <br />
        <div className="flex items-center justify-around max-w-md mx-auto text-primary">
          {selectedOperators.map((operator) => (
            <div
              key={operator.id}
              className="flex flex-col items-center justtify-center gap-2"
            >
              {operator?.logo ? (
                <img
                  src={operator?.logo as string}
                  alt={operator?.name as string}
                  className="size-8 rounded-full bg-white p-0.5 object-cover"
                />
              ) : (
                <div className="size-10 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500" />
              )}
              <div className="text-sm font-semibold">{operator.name}</div>
            </div>
          ))}
        </div>
        <br />
        <div className="text-primary bg-white py-6 rounded-lg text-sm font-semibold max-w-xs space-y-3 mx-auto">
          <div>Please deposit</div>
          <div className="text-2xl font-bold">
            32 <span className="text-base font-semibold">ETH</span>
          </div>{" "}
          <div>to to fund your validator</div>
        </div>
        <ButtonIcon
          state={isDepositing ? "loading" : "default"}
          disabled={isDepositing}
          className="w-full max-w-xs mx-auto"
          type="button"
          onClick={handleDepositETH}
        >
          {isDepositing ? "Depositing..." : "Deposit"}
        </ButtonIcon>
      </div>
    </div>
  );
}
