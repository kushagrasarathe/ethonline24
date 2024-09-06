import { TAppState } from "@/types/redux/app-state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APP } from "../constants";
import { SSVOperator, SSVOperatorsData } from "@/types/server";

const initialState: TAppState = {
  ssvOperatorsData: {},
  selectedOperators: [],
  selectedClusterSize: 4,
};

const appSlice = createSlice({
  name: APP,
  initialState,
  reducers: {
    setSsvOperatorsData: (
      state,
      action: PayloadAction<{ page: number; data: SSVOperatorsData }>
    ) => {
      state.ssvOperatorsData = {
        ...state.ssvOperatorsData,
        [action.payload.page]: action.payload.data,
      };
    },

    addOperator: (state, action: PayloadAction<SSVOperator[][0]>) => {
      if (state.selectedOperators.length < state.selectedClusterSize) {
        state.selectedOperators = [...state.selectedOperators, action.payload];
      }
    },

    removeOperator: (state, action: PayloadAction<string>) => {
      state.selectedOperators = state.selectedOperators.filter(
        (op) => op.public_key !== action.payload
      );
    },

    resetOperators: (state) => {
      state.selectedOperators = [];
    },

    setSelectedClusterSize: (state, action: PayloadAction<number>) => {
      state.selectedClusterSize = action.payload;
      if (state.selectedOperators.length > action.payload) {
        state.selectedOperators = state.selectedOperators.slice(
          0,
          action.payload
        );
      }
    },
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
