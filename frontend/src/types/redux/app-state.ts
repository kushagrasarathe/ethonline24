import {
  SSVOperator,
  SSVOperatorsData,
  ValidatiorFundingPeriod,
} from "../server";

export type TAppState = {
  eigenpodAddress: string;
  ssvOperatorsData?: {
    [key: number]: SSVOperatorsData | undefined;
  };
  selectedOperators: SSVOperator[];
  selectedClusterSize: number;
  keyStorePassword: string;
  keyStoreFile: string | null;
  depositDataFile: string | null;
  validatiorFundingPeriod: ValidatiorFundingPeriod | null;
};
