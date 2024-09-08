"use client";
import React, { useRef, useState } from "react";
import { FormCard } from "./eigen-pod-form";
import { ButtonIcon } from "../ui/button-icon";
import { Dot, FileCog2, FileIcon, FileJson2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";
import { useAppDispatch, useAppStore } from "@/redux/hooks";
import { appActions } from "@/redux/slices/app-slice";

interface FileState {
  keystoreFile: File | null;
  depositDataFile: File | null;
}

export default function GenerateKeysFrom() {
  const dispatch = useAppDispatch();

  const { eigenpodAddress, keyStorePassword } = useAppStore();
  const [files, setFiles] = useState<FileState>({
    keystoreFile: null,
    depositDataFile: null,
  });

  const keystoreInputRef = useRef<HTMLInputElement>(null);
  const depositDataInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: "keystoreFile" | "depositDataFile"
  ) => {
    const file = event.target.files?.[0];

    setFiles((prevState) => ({ ...prevState, [fileType]: file }));

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        console.log(json);

        if (fileType == "keystoreFile" && file) {
          dispatch(appActions.setKeyStoreFile(e.target?.result as string));
        }
        if (fileType == "depositDataFile" && file) {
          dispatch(appActions.setDepositDataFile(e.target?.result as string));
        }
      } catch (error) {
        console.error(error);
      }
    };

    reader.readAsText(file as Blob);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    fileType: "keystoreFile" | "depositDataFile"
  ) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    setFiles((prevState) => ({ ...prevState, [fileType]: file }));

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        console.log(json);

        if (fileType == "keystoreFile" && file) {
          dispatch(appActions.setKeyStoreFile(e.target?.result as string));
        }
        if (fileType == "depositDataFile" && file) {
          dispatch(appActions.setDepositDataFile(e.target?.result as string));
        }
      } catch (error) {
        console.error(error);
      }
    };

    reader.readAsText(file as Blob);
  };

  const handleClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-10 w-full">
      <FormCard
        title="Generate Validator Keystore"
        description="
        To run a validator, you need to generate a new set of validator keys and other data to process the ETH staking.
        
        Follow below steps to generate your validator keystore"
      >
        <div className="rounded-xl bg-white py-4">
          <div className="flex items-center gap-3 border-b border-gray-300 pb-4 px-4">
            <div className="size-3 bg-green-500 rounded-full" />
            <div className="size-3 bg-red-500 rounded-full" />
            <div className="size-3 bg-yellow-500 rounded-full" />
          </div>
          <div className="text-black px-4 pt-4 relative rounded bg-muted font-mono text-sm font-semibold space-y-3">
            <div>
              1. Download and install the{" "}
              <Link
                className="underline"
                target="_blank"
                rel="noreferrer noopener"
                href={
                  "https://github.com/ethereum/staking-deposit-cli/releases/"
                }
              >
                staking-deposit-cli
              </Link>{" "}
              from official GitHub repository.
            </div>
            <div>
              2. Navigate to the folder where you have zip, extract it and then
              open terminal.
            </div>
            <div className="space-y-1">
              <div>
                {" "}
                3. Use the following command to generate validator keys and
                deposit data
              </div>
              <div>If you don't have a mnemonic : </div>
              <div className="text-indigo-200 font-normal mt-0.5 block bg-gray-800 px-3 py-2 rounded-md text-[13px] w-fit">
                {`./deposit new-mnemonic --num_validators 1 --chain holesky
                --eth1_withdrawal_address ${
                  eigenpodAddress ? eigenpodAddress : `[YOUR_EIGENPOD_ADDRESS]`
                }`}
              </div>

              <div>Or, If you have a mnemonic : </div>
              <div className="text-indigo-200 font-normal mt-0.5 block bg-gray-800 px-3 py-2 rounded-md text-[13px] w-fit">
                {`./deposit existing-mnemonic --num_validators 1 --chain holesky
                  --eth1_withdrawal_address ${
                    eigenpodAddress
                      ? eigenpodAddress
                      : `[YOUR_EIGENPOD_ADDRESS]`
                  }`}
              </div>

              {!eigenpodAddress && (
                <div className="text-gray-500 font-normal mt-1 block text-xs">
                  Note: Replace [YOUR_EIGENPOD_ADDRESS] with your EigenPod
                  address.
                </div>
              )}
              <div className="text-gray-500 font-normal mt-2 block text-xs">
                Note: You would have to enter a password for the keystore file,
                ensure to remember it & keep it written somewhere safe.
              </div>
            </div>
            <div className="space-y-1">
              4. After generating the keys, upload the keystore file and deposit
              data file below which you can find in the folder "validator_keys".
            </div>
          </div>
        </div>
      </FormCard>

      <div className="space-y-4">
        <div className="text-2xl font-bold">
          Upload your validator keystore and deposit data files below
        </div>
        <div className="flex items-stretch gap-6">
          <div
            className="relative flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-white/90 w-full visually-hidden-focusable h-full min-h-60"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "keystoreFile")}
            onClick={() => handleClick(keystoreInputRef)}
          >
            <div className="text-center">
              <div className="border p-2 rounded-md max-w-min mx-auto">
                <FileJson2 size="1.6em" />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                <span className="font-semibold">
                  {files.keystoreFile
                    ? `Selected: ${files.keystoreFile.name}`
                    : "Select your keystore validator file or drag here to upload directly"}
                </span>
              </p>
            </div>
            <Input
              ref={keystoreInputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, "keystoreFile")}
            />
          </div>
          <div
            className="relative flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-white/90 w-full visually-hidden-focusable h-full min-h-60"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "depositDataFile")}
            onClick={() => handleClick(depositDataInputRef)}
          >
            <div className="text-center">
              <div className="border p-2 rounded-md max-w-min mx-auto">
                <FileCog2 size="1.6em" />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                <span className="font-semibold">
                  {files.depositDataFile
                    ? `Selected: ${files.depositDataFile.name}`
                    : "Select your deposit data file or drag here to upload directly"}
                </span>
              </p>
            </div>
            <Input
              ref={depositDataInputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, "depositDataFile")}
            />
          </div>
        </div>
        <div>
          <Label className="space-y-2">
            <span className="block">Keystore Password</span>
            <Input
              value={keyStorePassword}
              onChange={(e) => {
                if (e.target.value) {
                  dispatch(appActions.setKeyStorePassword(e.target.value));
                }
              }}
              disabled={!files.keystoreFile}
              type="password"
              placeholder="Enter your keystore file password"
            />
          </Label>
        </div>
      </div>
    </div>
  );
}
