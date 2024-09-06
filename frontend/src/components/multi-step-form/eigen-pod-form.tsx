import React from "react";
import { Button } from "../ui/button";
import { ButtonIcon } from "../ui/button-icon";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import CreateSsvOperatorsCluster from "../create-ssv-operators-cluster";

interface FormCardProps {
  title: string;
  description: string;
  children?: React.ReactElement;
  cta?: React.ReactElement;
}

export default function CreateEigenPodForm() {
  return (
    <div className="w-full space-y-6">
      <div className="text-2xl font-bold">Native Eth Staking</div>
      <div className="flex flex-col items-stretch justify-between gap-8">
        <FormCard
          title="Create Eigenpod"
          description="In order to restake your beacon chain validators, you must first
              create an EigenPod. An EigenPod is a smart contract managed by
              you, which allows the EigenLayer protocol to monitor and manage
              balance and withdrawal statuses."
          cta={
            <ButtonIcon
              variant={"secondary"}
              className="uppercase rounded-full w-fit px-8"
            >
              Create Eigenpod
            </ButtonIcon>
          }
        />
        <ArrowDown className="size-12 text-primary mx-auto" />

        <FormCard
          title="Generate Validator Keystore"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed in soluta ea. Laboriosam quam dignissimos officiis ab ad iste commodi pariatur, porro repellat quasi veritatis maxime ratione assumenda repudiandae ea."
          cta={
            <ButtonIcon
              variant={"secondary"}
              className="uppercase rounded-full w-fit px-8"
            >
              Create Eigenpod
            </ButtonIcon>
          }
        />

        <Card className="bg-primary text-secondary rounded-2xl p-2">
          <CardHeader className="pb-3">
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-secondary/80 text-sm font-semibold">
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
        {children && children}
        {description && (
          <div className="text-secondary/80 text-sm font-semibold">
            {description}
          </div>
        )}
        {cta && cta}
      </CardContent>
    </Card>
  );
};
