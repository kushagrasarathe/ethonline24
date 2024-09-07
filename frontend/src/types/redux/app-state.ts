import { SSVOperator, SSVOperatorsData } from "../server";

export type TAppState = {
  eigenpodAddress: string;
  ssvOperatorsData?: {
    [key: number]: SSVOperatorsData | undefined;
  };
  selectedOperators: SSVOperator[];
  selectedClusterSize: number;
  keyStorePassword: string;
  keyStoreFile: File | null;
  depositDataFile: File | null;
};
