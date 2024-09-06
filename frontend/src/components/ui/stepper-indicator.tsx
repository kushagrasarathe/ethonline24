import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { Check } from "lucide-react";
import React, { Fragment } from "react";

interface StepperIndicatorProps {
  activeStep: number;
}

const StepperIndicator = ({ activeStep }: StepperIndicatorProps) => {
  return (
    <div className="flex justify-center items-center">
      {[1, 2, 3, 4, 5].map((step) => (
        <Fragment key={step}>
          <div
            className={clsx(
              "w-[40px] h-[40px] flex justify-center items-center m-1 border-[2px] rounded-full shadow-lg",
              step < activeStep && "bg-primary text-white border-white",
              step === activeStep && "border-secondary text-secondary",
              step > activeStep && "border-white"
            )}
          >
            {step >= activeStep ? step : <Check className="size-5" />}
          </div>
          {step !== 5 && (
            <Separator
              orientation="horizontal"
              className={clsx(
                "w-[120px] h-[2px]  drop-shadow-xl",
                step <= activeStep - 1 && "bg-secondary"
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default StepperIndicator;
