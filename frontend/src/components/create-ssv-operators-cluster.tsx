import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";

import { useFetchSsvOperators } from "@/hooks/api/useFetchSsvOperators";
import { useInView } from "react-intersection-observer";
import { Loader2, XIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { appActions } from "@/redux/slices/app-slice";
import { SSVOperator } from "@/types/server";
import { Button } from "./ui/button";
import { ButtonIcon } from "./ui/button-icon";
import { formatUnits } from "viem";
import { calculateOperatorFees } from "@/utils/ssvFees";
import { Badge } from "./ui/badge";

const clusterSet = ["4", "7", "10", "13"].map(Number);

export default function CreateSsvOperatorsCluster() {
  const dispatch = useAppDispatch();
  const { selectedClusterSize, ssvOperatorsData, selectedOperators } =
    useAppStore();

  const {
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchSsvOperators();

  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const isOperatorSelected = (operatorId: string) =>
    selectedOperators.some((operator) => operator.public_key === operatorId);

  const handleOperatorSelect = (operator: SSVOperator) => {
    if (isOperatorSelected(operator.public_key)) {
      dispatch(appActions.removeOperator(operator.public_key));
    } else {
      dispatch(appActions.addOperator(operator));
    }
  };

  const handleClusterSizeChange = (newSize: number) => {
    dispatch(appActions.setSelectedClusterSize(newSize));
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="space-y-4 w-full">
      <div className="px-0 flex flex-row items-center justify-between">
        <div className="space-y-2">
          <div className="text-primary text-2xl font-bold w-full">
            Create operator cluster
          </div>
          <div className="text-gray-500 text-sm font-semibold max-w-3xl w-full">
            A Cluster of operators will be running ETH Execution & consensus
            client on your behalf via the SSV Network, so you don't need to
            worry about the hassle of running an Ethereum validator
          </div>
        </div>

        {selectedClusterSize > 0 && (
          <ButtonIcon
            size={"sm"}
            iconPosition="right"
            onClick={() => {
              handleClusterSizeChange(0);
              dispatch(appActions.resetOperators());
            }}
            icon={XIcon}
          >
            Reset
          </ButtonIcon>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-base font-semibold">
          Select operator cluster size
        </div>

        <div className="flex items-stretch gap-3">
          {clusterSet.map((set) => (
            <div
              key={set}
              className="w-full"
              onClick={() => handleClusterSizeChange(set)}
            >
              <Card
                className={cn(
                  selectedClusterSize === set
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : "bg-white hover:bg-white/90",
                  `w-full rounded-xl cursor-pointer`
                )}
              >
                <CardContent className="flex items-center justify-center p-4 text-lg font-semibold">
                  {set}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Card className="bg-transparent shadow-none border-0 rounded-2xl max-h-[500px] py-6 overflow-y-auto bg-white">
        <CardContent className="flex flex-col justify-center relative pt-0">
          <div className="flex items-center justify-between gap-3 font-semibold text-gray-500 border-b  py-3 sticky -top-6 bg-white z-40">
            <div className="w-2/12">Select</div>
            <div className="w-3/12">Operator</div>
            <div className="w-2/12">Validators</div>
            <div className="w-2/12">Performance</div>
            <div className="w-2/12">Fees</div>
          </div>

          {Object.keys(ssvOperatorsData || {}).map((page) => (
            <div key={page}>
              {ssvOperatorsData?.[+page]?.operators?.map((operator) => (
                <div
                  key={operator.public_key}
                  className={cn(
                    "flex items-center justify-between hover:bg-gray-50/90 p-3",
                    ((operator?.validators_count as number) > 500 ||
                      !!operator.is_private) &&
                      "bg-gray-50 hover:cursor-not-allowed"
                  )}
                >
                  <div className="w-2/12">
                    <Checkbox
                      checked={isOperatorSelected(operator.public_key)}
                      onCheckedChange={() => handleOperatorSelect(operator)}
                      disabled={
                        (selectedOperators.length === selectedClusterSize &&
                          !isOperatorSelected(operator.public_key)) ||
                        (operator?.validators_count as number) > 500 ||
                        !!operator.is_private
                      }
                    />
                  </div>
                  <div className="flex items-start justify-normal gap-2 w-3/12">
                    {operator?.logo ? (
                      <img
                        src={operator?.logo as string}
                        alt={operator?.name as string}
                        className="size-12 rounded-full bg-white p-0.5 object-cover"
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
                  <div className="w-2/12">{operator.validators_count}</div>
                  <div className="w-2/12 space-y-1">
                    <div>{operator.performance?.["30d"]?.toFixed(2)} %</div>
                    {operator.performance?.["30d"] === 0 && (
                      <Badge variant={"destructive"}>In-active</Badge>
                    )}
                  </div>
                  <div className="w-2/12">
                    {calculateOperatorFees(operator?.fee || "0")}
                  </div>
                </div>
              ))}{" "}
            </div>
          ))}

          {isFetchingNextPage && (
            <div className="mx-auto flex gap-2 items-center pt-4">
              <Loader2 className="size-5 animate-spin" /> <div>Loading...</div>
            </div>
          )}
          <div ref={ref} style={{ height: "1px" }} />
        </CardContent>
      </Card>

      <div className="w-full flex justify-center">
        {!!selectedOperators.length &&
          selectedClusterSize === selectedOperators.length && (
            <div className="text-center font-semibold ">
              Selected operators saved, you can now head over to next step now
            </div>
          )}
      </div>
    </div>
  );
}
