"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ButtonIcon } from "../ui/button-icon";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { ArrowDown, CopyIcon } from "lucide-react";
import CreateSsvOperatorsCluster from "../create-ssv-operators-cluster";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppStore } from "@/redux/hooks";
import { appActions } from "@/redux/slices/app-slice";
import { deployEigenPod, getEigenPod } from "@/utils/eigenLayer";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { createWalletClient, custom, zeroAddress } from "viem";
import { holesky } from "viem/chains";

interface FormCardProps {
  title: string;
  description: string;
  children?: React.ReactElement;
  cta?: React.ReactElement;
}

export default function CreateEigenPodForm() {
  const [isCreating, setIsCreating] = useState(false);
  const { eigenpodAddress } = useAppStore();
  const dispatch = useAppDispatch();

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  useEffect(() => {
    const fetchEigenPod = async () => {
      if (!publicClient || !walletClient?.account) {
        return;
      }

      console.log("Fetching eigenpod");

      const eigenPodAddress = await getEigenPod(
        publicClient,
        walletClient.account.address
      );
      if (eigenPodAddress !== zeroAddress && eigenPodAddress) {
        dispatch(appActions.setEigenpodAddress(eigenPodAddress));
        console.log(`Eigenpod found: ${eigenPodAddress}`);
      }
    };

    if (!eigenpodAddress && publicClient && walletClient?.account.address) {
      fetchEigenPod();
    }
  }, [address, publicClient, walletClient]);

  const handleCreateEigenPod = async () => {
    try {
      setIsCreating(true);
      console.log("Creating eigenpod");

      if (!publicClient || !walletClient?.account) {
        setIsCreating(false);
        console.log("Public client or wallet client not found");
        return;
      }

      const data = await deployEigenPod(publicClient, walletClient);

      if (data && data.eigenPodAddress) {
        dispatch(appActions.setEigenpodAddress(data.eigenPodAddress));
        console.log(
          `Eigenpod created: ${data.eigenPodAddress} with tx : ${data.txHash}`
        );
      } else {
        console.log("Error creating eigenpod");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-2xl font-bold">Native Eth Staking</div>
      <div className="flex flex-col items-stretch justify-between gap-6">
        <FormCard
          title="Create Eigenpod"
          description="In order to restake your beacon chain validators, you must first
              create an EigenPod. An EigenPod is a smart contract managed by
              you, which allows the EigenLayer protocol to monitor and manage
              balance and withdrawal statuses."
          cta={
            eigenpodAddress ? (
              <div className="space-y-2">
                <ButtonIcon
                  type="button"
                  icon={CopyIcon}
                  iconPosition="right"
                  onClick={() => {
                    navigator.clipboard.writeText(eigenpodAddress);
                    toast({
                      title: "Copied to clipboard!",
                    });
                  }}
                  variant={"secondary"}
                  className="uppercase rounded-full w-fit px-8"
                >
                  {eigenpodAddress}
                </ButtonIcon>
                <p className="text-sm ml-2">
                  *Move forward to next step by clicking on Next below but
                  before that make sure to copy and save this address*
                </p>
              </div>
            ) : (
              <ButtonIcon
                type="button"
                variant={"secondary"}
                onClick={() => handleCreateEigenPod()}
                state={isCreating ? "loading" : "default"}
                className="uppercase rounded-full w-fit px-8"
              >
                {eigenpodAddress ? "Creating" : "Create EigenPod"}
              </ButtonIcon>
            )
          }
        />

        <ArrowDown className="size-12 text-primary mx-auto" />
        <Card className="bg-primary text-secondary rounded-2xl p-2 opacity-60">
          <CardHeader className="pb-3">
            <CardTitle>Connect Validator to EigenPod</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-secondary/80 text-sm font-semibold">
              To give EigenLayer access to your validators, use your staking
              client to point your validator to your EigenPod address. You may
              also choose to use your EigenPod as your {`validator's`} fee
              recipient. This is optional, but will allow you to earn additional
              Restaking Points. You will need to use the Command Line Interface
              for this step. Learn more.{" "}
              <Link
                target="_blank"
                rel="noreferrer noopener"
                className="underline"
                href={
                  "https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-user-guide/native-restaking/create-eigenpod-and-set-withdrawal-credentials/repointing-a-validators-withdrawal-credentials"
                }
              >
                Learn more
              </Link>
            </div>
            <ButtonIcon
              state="loading"
              variant={"secondary"}
              className="uppercase rounded-full px-6 animate-pulse"
            >
              Waiting for Connected Validators
            </ButtonIcon>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const FormCard = ({
  title,
  description,
  cta,
  children,
}: FormCardProps) => {
  return (
    <Card className="bg-primary text-secondary w-full rounded-2xl p-2">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative flex flex-col gap-4 justify-between">
        {description && (
          <div className="text-secondary/80 text-sm font-semibold">
            {description}
          </div>
        )}
        {children && children}

        {cta && cta}
      </CardContent>
    </Card>
  );
};
