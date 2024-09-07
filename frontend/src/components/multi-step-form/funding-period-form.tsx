"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAppDispatch } from "@/redux/hooks";
import { appActions } from "@/redux/slices/app-slice";
import { ButtonIcon } from "../ui/button-icon";
import { Dot } from "lucide-react";
import { set } from "react-hook-form";

export default function FundingPeriodForm() {
  const dispatch = useAppDispatch();
  const [isFundingInfoSaved, setIsFundingInfoSaved] = React.useState(false);
  const [selectedDuration, setSelectedDuration] = React.useState<
    "six-months" | "one-year"
  >("six-months");

  const handleDurationChange = (value: "six-months" | "one-year") => {
    setSelectedDuration(value);
  };

  const handleValidatorFundingPeriodData = () => {
    setIsFundingInfoSaved(true);
    dispatch(
      appActions.setValidatorFundingPeriod({
        duration: selectedDuration,
        operatorFee: 0,
        networkFee: 0,
        liquidationCollateral: 0,
        totalFunding: 0,
      })
    );
  };

  return (
    <div className="w-full md:max-w-xl space-y-4">
      <div className="space-y-2">
        <div className="text-2xl font-bold text-primary">
          Select your validator funding period
        </div>
        <p className="text-gray-400 text-sm font-semibold">
          The SSV amount you deposit will determine your validator operational
          runway
        </p>
      </div>
      <Card className="rounded-xl">
        {isFundingInfoSaved ? (
          <div className="space-y-5 p-6">
            <div className="border-b pb-4 space-y-2">
              <div className="mb-4 flex flex-col items-center justify-center gap-2">
                <svg
                  className="checkmark pt-0"
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
                </svg>
                <div className="text-gray-500 font-semibold">
                  Validator funding period data saved
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>Funding Summary</div>
                <div>Sub Total</div>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div>Operator Fee</div>
                <div className="text-gray-500">0.0 SSV</div>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div>Network Fee</div>
                <div className="text-gray-500">0.0 SSV</div>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div>Liquidation collateral</div>
                <div className="text-gray-500">0.0 SSV</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Total</div>
              <div className="font-semibold">2 SSV</div>
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
                <div className="text-gray-500">0.0 SSV</div>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div>Network Fee</div>
                <div className="text-gray-500">0.0 SSV</div>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div>Liquidation collateral</div>
                <div className="text-gray-500">0.0 SSV</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">Total</div>
              <div className="font-semibold">2 SSV</div>
            </div>
          </CardContent>
        )}
      </Card>
      {!isFundingInfoSaved && (
        <ButtonIcon
          onClick={handleValidatorFundingPeriodData}
          type="button"
          className="w-full"
        >
          Save
        </ButtonIcon>
      )}
    </div>
  );
}
