"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StepperFormKeysType, StepperFormValues } from "@/types/hook-stepper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "../ui/button";
import { STEPPER_FORM_KEYS } from "@/constants/hook-stepper-constants";
import StepperIndicator from "../ui/stepper-indicator";
import { TriangleAlert } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CreateEigenPodForm from "./eigen-pod-form";
import CreateSsvOperatorsCluster from "../create-ssv-operators-cluster";
import GenerateKeysFrom from "./generate-keys-from";
import FundingPeriodForm from "./funding-period-form";
import DepositEthForm from "./deposit-eth-form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/redux/hooks";

function getStepContent(step: number) {
  switch (step) {
    case 1:
      return <CreateEigenPodForm />;
    case 2:
      return <GenerateKeysFrom />;
    case 3:
      return <CreateSsvOperatorsCluster />;
    case 4:
      return <FundingPeriodForm />;
    case 5:
      return <DepositEthForm />;
    default:
      return "Unknown step";
  }
}

const MultiStepForm = () => {
  const {
    eigenpodAddress,
    keyStoreFile,
    depositDataFile,
    keyStorePassword,
    selectedOperators,
  } = useAppStore();
  const [activeStep, setActiveStep] = useState(1);
  const [erroredInputName, setErroredInputName] = useState("");
  const methods = useForm<StepperFormValues>({
    mode: "onTouched",
  });

  const {
    trigger,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  // focus errored input on submit
  useEffect(() => {
    const erroredInputElement =
      document.getElementsByName(erroredInputName)?.[0];
    if (erroredInputElement instanceof HTMLInputElement) {
      erroredInputElement.focus();
      setErroredInputName("");
    }
  }, [erroredInputName]);

  const onSubmit = async (formData: StepperFormValues) => {
    console.log({ formData });
    // simulate api call
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve({
        //   title: "Success",
        //   description: "Form submitted successfully",
        // });
        reject({
          message: "There was an error submitting form",
          // message: "Field error",
          // errorKey: "fullName",
        });
      }, 2000);
    })
      .then((response: unknown) => {
        if (
          typeof response === "object" &&
          response !== null &&
          "title" in response &&
          "description" in response
        ) {
          const { title, description } = response as {
            title: string;
            description: string;
          };
          toast({
            title,
            description,
          });
        }
      })
      .catch(({ message: errorMessage, errorKey }) => {
        if (
          errorKey &&
          Object.values(STEPPER_FORM_KEYS)
            .flatMap((fieldNames) => fieldNames)
            .includes(errorKey)
        ) {
          let erroredStep: number | undefined;
          // get the step number based on input name
          for (const [key, value] of Object.entries(STEPPER_FORM_KEYS)) {
            if (value.includes(errorKey as never)) {
              erroredStep = Number(key);
              break;
            }
          }
          // set active step and error
          if (erroredStep !== undefined) {
            setActiveStep(erroredStep);
            setError(errorKey as StepperFormKeysType, {
              message: errorMessage,
            });
            setErroredInputName(errorKey);
          } else {
            setError("root.formError", {
              message: "Invalid error key",
            });
          }
        } else {
          setError("root.formError", {
            message: errorMessage,
          });
        }
      });
  };

  const handleNext = async () => {
    const isStepValid = await trigger(undefined, { shouldFocus: true });
    if (isStepValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const disableNextStep =
    (activeStep === 1 && !eigenpodAddress) ||
    (activeStep === 2 &&
      !keyStoreFile &&
      !depositDataFile &&
      !keyStorePassword) ||
    (activeStep === 3 && !selectedOperators.length);

  return (
    <div className="h-full space-y-10">
      <div className="bg-primary text-secondary py-3 shadow-[inset_0px_0px_10px_0px_#00000024] rounded-full">
        <StepperIndicator activeStep={activeStep} />
      </div>
      {errors.root?.formError && (
        <Alert variant="destructive" className="mt-[28px]">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Form Error</AlertTitle>
          <AlertDescription>{errors.root?.formError?.message}</AlertDescription>
        </Alert>
      )}
      <FormProvider {...methods}>
        <form
          noValidate
          className="flex flex-col items-center justify-between gap-10 h-full bg-secondary text-primary p-14 shadow-[inset_0px_0px_4px_0px_#00000024] rounded-3xl min-h[84svh]"
        >
          {getStepContent(activeStep)}
        </form>
      </FormProvider>
      <div className="flex justify-center items-center gap-5">
        <Button
          type="button"
          className="w-full rounded-full shadow-none uppercase"
          variant={"outline"}
          onClick={handleBack}
          disabled={activeStep === 1}
        >
          Back
        </Button>
        {activeStep === 5 ? (
          <Link
            href={""}
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full rounded-full shadow-none uppercase"
            )}
            onClick={handleSubmit(onSubmit)}
            // disabled={isSubmitting}
          >
            Manage Cluster
          </Link>
        ) : (
          <Button
            type="button"
            variant={"default"}
            className="w-full rounded-full shadow-none uppercase"
            onClick={handleNext}
            disabled={disableNextStep}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
