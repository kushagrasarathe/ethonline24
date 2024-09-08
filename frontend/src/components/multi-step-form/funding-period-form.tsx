"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppDispatch, useAppStore } from "@/redux/hooks";
import { appActions } from "@/redux/slices/app-slice";
import { ButtonIcon } from "../ui/button-icon";
import { Dot } from "lucide-react";
import { set } from "react-hook-form";
import { calculateOperatorFees } from "@/utils/ssvFees";
import {
  approveSSVToken,
  distributeKeys,
  registerValidator,
} from "@/utils/ssvNetwork";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import Link from "next/link";

export default function FundingPeriodForm() {
  const dispatch = useAppDispatch();
  const {
    selectedOperators,
    validatiorFundingPeriod,
    eigenpodAddress,
    keyStoreFile,
    keyStorePassword,
  } = useAppStore();

  const [isApproving, setIsApproving] = React.useState(false);
  const [isDistributing, setIsDistributing] = React.useState(false);
  const [isFundingInfoSaved, setIsFundingInfoSaved] = React.useState(false);
  const [selectedDuration, setSelectedDuration] = React.useState<
    "six-months" | "one-year"
  >("six-months");

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const handleDurationChange = (value: "six-months" | "one-year") => {
    setSelectedDuration(value);
  };

  const setCalculatedFees = () => {
    let operatorFee = 0;

    for (const operator of selectedOperators) {
      operatorFee += Number(calculateOperatorFees(operator.fee || "0"));
    }

    let networkFee = 0;

    if (selectedDuration === "six-months") {
      networkFee = 0.5;
    } else {
      networkFee = 1;
    }

    const minLiquidationCollateral = 1;

    const totalFees = operatorFee + networkFee + minLiquidationCollateral;

    dispatch(
      appActions.setValidatorFundingPeriod({
        duration: selectedDuration,
        operatorFee: operatorFee,
        networkFee: networkFee,
        liquidationCollateral: minLiquidationCollateral,
        totalFunding: totalFees,
      })
    );
  };

  const handleValidatorFundingPeriodData = () => {
    setIsFundingInfoSaved(true);
    setCalculatedFees();
  };

  useEffect(() => {
    if (!validatiorFundingPeriod) {
      setCalculatedFees();
    }
  }, [validatiorFundingPeriod]);

  const handleApproveToken = async () => {
    setIsApproving(true);
    try {
      if (!publicClient || !walletClient?.account) {
        return;
      }

      const amount = validatiorFundingPeriod?.totalFunding;
      if (!amount) {
        return;
      }
      const tx = await approveSSVToken(publicClient, walletClient, amount);
      console.log(`Approved ${amount} SSV token with tx: ${tx}`);
      setIsApproving(false);
    } catch (error) {
      console.log(error);
      setIsApproving(false);
    }
  };

  const handleRegisterValidator = async () => {
    setIsDistributing(true);
    try {
      // get the selectedOperatorIds
      const operatorIds = selectedOperators?.map((operator) => operator.id!);

      // get the selectedOPeratorKeys
      const operatorKeys = selectedOperators?.map(
        (operator) => operator.public_key
      );

      // decode the keystore File => JSON string
      if (!keyStoreFile) {
        console.log("Keystore file not found");
        return;
      }

      // distribute the keys
      if (!publicClient || !walletClient?.account) {
        return;
      }
      console.log("Distributing keys");
      const payload = await distributeKeys({
        operatorKeys,
        operatorIds,
        keystoreFile: keyStoreFile,
        keystorePassword: keyStorePassword,
        publicClient,
        walletClient,
      });
      console.log(payload);

      if (!payload) {
        console.log("Payload couldn't be created");
        return;
      }

      const fees = validatiorFundingPeriod?.totalFunding;
      if (!fees) {
        console.log("Fees not found");
        return;
      }
      console.log("Registering validator");

      // registerValidator call
      const tx = await registerValidator(
        publicClient,
        walletClient,
        payload,
        fees
      );
      console.log(`Registered validator with tx: ${tx?.txHash}`);
      setIsDistributing(false);
    } catch (error) {
      console.log(error);
      setIsDistributing(false);
    }
  };

  return (
    <div className="w-full md:max-w-xl space-y-4">
      <div className="space-y-2">
        <div className="text-2xl font-bold text-primary">
          Select your validator funding period
        </div>
        <p className="text-gray-500 text-sm font-semibold">
          To run a Distributed Validator you must split your validation key into
          Key Shares and distribute them across your selected operators to
          operate in your behalf to improve your validator resilience, safety,
          liveliness, and diversity.
          <br /> <br />
          The SSV amount you deposit will determine your validator operational
          runway
        </p>
      </div>
      <Card className="rounded-xl">
        {isFundingInfoSaved ? (
          <div className="space-y-5 p-6">
            {eigenpodAddress && (
              <div className="pb-4 border-b space-y-2">
                <div className="text-sm font-semibold text-gray-500">
                  Validator Public Key
                </div>
                <div className="bg-primary text-secondary p-3 rounded-lg font-semibold">
                  {eigenpodAddress}
                </div>
              </div>
            )}
            <div className="mb-6 space-y-1">
              {selectedOperators?.map((operator) => (
                <div
                  key={operator.public_key}
                  className="flex items-center justify-between px-2"
                >
                  <div className="flex items-center justify-normal gap-2 w-3/12">
                    {operator?.logo ? (
                      <img
                        src={operator?.logo as string}
                        alt={operator?.name as string}
                        className="size-8 rounded-full bg-white p-0.5 object-cover"
                      />
                    ) : (
                      <div className="size-10 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500" />
                    )}
                    <div>
                      <div className="text-base font-semibold">
                        {operator.name}
                      </div>
                      <div className="">Id: {operator.id}</div>
                    </div>
                  </div>

                  <div className="ml-auto">
                    {calculateOperatorFees(operator?.fee || "0")}
                  </div>
                </div>
              ))}{" "}
            </div>
            <div className="border-y py-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>Funding Summary</div>
                <div>Sub Total</div>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div>Operator Fee</div>
                <div className="text-gray-500">
                  {validatiorFundingPeriod
                    ? validatiorFundingPeriod.operatorFee
                    : "0.0"}
                  SSV
                </div>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div>Network Fee</div>
                <div className="text-gray-500">
                  {validatiorFundingPeriod
                    ? validatiorFundingPeriod.networkFee
                    : "0.0"}{" "}
                  SSV
                </div>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div>Liquidation collateral</div>
                <div className="text-gray-500">
                  {validatiorFundingPeriod
                    ? validatiorFundingPeriod.liquidationCollateral
                    : "0.0"}{" "}
                  SSV
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Total</div>
              <div className="font-semibold">
                {validatiorFundingPeriod
                  ? validatiorFundingPeriod.totalFunding
                  : "0.0"}{" "}
                SSV
              </div>
            </div>
          </div>
        ) : (
          <CardContent className="space-y-5 p-6">
            <RadioGroup
              value={selectedDuration}
              onValueChange={handleDurationChange}
              defaultValue="six-months"
              className="space-y-2"
            >
              <div
                className={`flex items-center gap-x-2 w-full border rounded-xl p-4 cursor-pointer ${
                  selectedDuration === "six-months"
                    ? "bg-primary text-white"
                    : ""
                }`}
                onClick={() => handleDurationChange("six-months")}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                    selectedDuration === "six-months"
                      ? "bg-white"
                      : "bg-transparent"
                  }`}
                >
                  {selectedDuration === "six-months" && (
                    <div className="bg-primary size-1.5 rounded-full" />
                  )}
                </div>
                <Label htmlFor="six-months" className="cursor-pointer">
                  6 Months
                </Label>
                <div className="ml-auto font-semibold">0.5 SSV</div>
              </div>

              <div
                className={`flex items-center gap-x-2 w-full border rounded-xl p-4 cursor-pointer ${
                  selectedDuration === "one-year" ? "bg-primary text-white" : ""
                }`}
                onClick={() => handleDurationChange("one-year")}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                    selectedDuration === "one-year"
                      ? "bg-white"
                      : "bg-transparent"
                  }`}
                >
                  {selectedDuration === "one-year" && (
                    <div className="bg-primary size-1.5 rounded-full" />
                  )}
                </div>
                <Label htmlFor="one-year" className="cursor-pointer">
                  1 Year
                </Label>
                <div className="ml-auto font-semibold">1 SSV</div>
              </div>
            </RadioGroup>
            <div className="border-y py-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>Funding Summary</div>
                <div>Sub Total</div>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div>Operator Fee</div>
                <div className="text-gray-500">
                  {validatiorFundingPeriod
                    ? validatiorFundingPeriod.operatorFee
                    : "0.0"}
                  SSV
                </div>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div>Network Fee</div>
                <div className="text-gray-500">
                  {validatiorFundingPeriod
                    ? validatiorFundingPeriod.networkFee
                    : "0.0"}{" "}
                  SSV
                </div>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div>Liquidation collateral</div>
                <div className="text-gray-500">
                  {validatiorFundingPeriod
                    ? validatiorFundingPeriod.liquidationCollateral
                    : "0.0"}{" "}
                  SSV
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Total</div>
              <div className="font-semibold">
                {validatiorFundingPeriod
                  ? validatiorFundingPeriod.totalFunding
                  : "0.0"}{" "}
                SSV
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      <div className="text-sm text-center max-w-lg mx-auto font-semibold text-indigo-600 font-mono">
        Please note that you need SSV tokens to fund your validator. You can get
        some from the{" "}
        <Link
          target="_blank"
          rel="noreferrer noopener"
          href={"https://faucet.ssv.network/"}
          className="underline"
        >
          SSV Network faucet.
        </Link>
      </div>
      {!isFundingInfoSaved ? (
        <ButtonIcon
          onClick={handleValidatorFundingPeriodData}
          type="button"
          className="w-full"
        >
          Save
        </ButtonIcon>
      ) : (
        <div className="flex items-center gap-2 justify-between">
          <ButtonIcon
            state={isApproving ? "loading" : "default"}
            variant={"outline"}
            disabled={isApproving}
            type="button"
            className="w-4/5"
            onClick={handleApproveToken}
          >
            {isApproving ? "Approving..." : "Approve"}
          </ButtonIcon>

          <ButtonIcon
            state={isDistributing ? "loading" : "default"}
            disabled={isDistributing}
            type="button"
            className="w-full"
            onClick={handleRegisterValidator}
          >
            {isDistributing
              ? "Distributing..."
              : "Distribute Keys & Register Validator"}
          </ButtonIcon>
        </div>
      )}
    </div>
  );
}
