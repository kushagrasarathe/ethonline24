import { SSVOperator, SSVOperatorsData } from "../server";

export type TAppState = {
  ssvOperatorsData?: {
    [key: number]: SSVOperatorsData | undefined;
  };
  selectedOperators: SSVOperator[];
  selectedClusterSize: number;
};
