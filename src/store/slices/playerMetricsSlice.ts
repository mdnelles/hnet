import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlayerMetrics {
   pid: number;
   pos?: string;
   bf?: number; // Body Fat %
   hlen?: number; // Hand Length
   hwid?: number; // Hand Width
   hnos?: number; // Height w/o Shoes
   hsho?: number; // Height w/ Shoes
   reach?: number; // Standing Reach
   wgt?: number; // Weight
   wing?: number; // Wingspan
}

interface PlayerMetricsState {
   metrics: PlayerMetrics[];
}

const initialState: PlayerMetricsState = {
   metrics: [],
};

const playerMetricsSlice = createSlice({
   name: "playerMetrics",
   initialState,
   reducers: {
      setPlayerMetrics(state, action: PayloadAction<PlayerMetrics[]>) {
         state.metrics = action.payload;
      },
      addPlayerMetric(state, action: PayloadAction<PlayerMetrics>) {
         state.metrics.push(action.payload);
      },
      updatePlayerMetric(state, action: PayloadAction<PlayerMetrics>) {
         const index = state.metrics.findIndex(
            (m) => m.pid === action.payload.pid
         );
         if (index !== -1) {
            state.metrics[index] = action.payload;
         }
      },
      removePlayerMetric(state, action: PayloadAction<number>) {
         state.metrics = state.metrics.filter((m) => m.pid !== action.payload);
      },
      clearPlayerMetrics(state) {
         state.metrics = [];
      },
   },
});

export const {
   setPlayerMetrics,
   addPlayerMetric,
   updatePlayerMetric,
   removePlayerMetric,
   clearPlayerMetrics,
} = playerMetricsSlice.actions;

export default playerMetricsSlice.reducer;
