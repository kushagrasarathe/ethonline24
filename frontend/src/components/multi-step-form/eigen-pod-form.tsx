"use client";

import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppStore } from "@/redux/hooks";
import { appActions } from "@/redux/slices/app-slice";
import { deployEigenPod, getEigenPod } from "@/utils/eigenLayer";
import { CopyIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { zeroAddress } from "viem";
import { holesky } from "viem/chains";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { Button } from "../ui/button";
import { ButtonIcon } from "../ui/button-icon";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ConnectWalletButton from "../wallet-connect";

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
      setIsCreating(true);
      console.log("Fetching eigenpod");

      const eigenPodAddress = await getEigenPod(
        publicClient,
        walletClient.account.address
      );
      if (eigenPodAddress !== zeroAddress && eigenPodAddress) {
        dispatch(appActions.setEigenpodAddress(eigenPodAddress));
        console.log(`Eigenpod found: ${eigenPodAddress}`);
      }

      setIsCreating(false);
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
      <div className="flex flex-col items-stretch justify-between gap-6">
        <FormCard
          title="Create Eigenpod"
          description="In order to restake your beacon chain validators, you must first create an EigenPod as it will be the withdrawal address of the validator you run. An EigenPod is a smart contract managed by you, which allows the EigenLayer protocol to monitor and manage balance and withdrawal statuses."
          cta={
            eigenpodAddress ? (
              <div className="space-y-2">
                <p className="text-sm ml-2">EigenPOD found with address</p>
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
                disabled={isCreating}
                state={isCreating ? "loading" : "default"}
                className="uppercase rounded-full w-fit px-8"
              >
                {eigenpodAddress ? "Creating" : "Create EigenPod"}
              </ButtonIcon>
            )
          }
        />
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
  const { chainId, isConnected } = useAccount();
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
        {!isConnected ? (
          <ConnectWalletButton />
        ) : chainId !== holesky.id ? (
          <Button
            type="button"
            variant="secondary"
            disabled
            className="uppercase rounded-full w-fit px-8"
          >
            Switch to Holesky Network Please
          </Button>
        ) : (
          cta
        )}
      </CardContent>
    </Card>
  );
};
