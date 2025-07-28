import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShootingMetrics {
   pid: number;
   off_dribble_score?: number;
   spot_up_score?: number;
   three_star_score?: number;
   mid_star_score?: number;
   three_side_score?: number;
   mid_side_score?: number;
   freethrow_pct?: number;
}

interface ShootingMetricsState {
   data: ShootingMetrics[];
}

const initialState: ShootingMetricsState = {
   data: [],
};

const shootingMetricsSlice = createSlice({
   name: "shootingMetrics",
   initialState,
   reducers: {
      setShootingMetrics(state, action: PayloadAction<ShootingMetrics[]>) {
         state.data = action.payload;
      },
      addShootingMetric(state, action: PayloadAction<ShootingMetrics>) {
         state.data.push(action.payload);
      },
      updateShootingMetric(state, action: PayloadAction<ShootingMetrics>) {
         const index = state.data.findIndex(
            (m) => m.pid === action.payload.pid
         );
         if (index !== -1) {
            state.data[index] = action.payload;
         }
      },
      removeShootingMetric(state, action: PayloadAction<number>) {
         state.data = state.data.filter((m) => m.pid !== action.payload);
      },
      clearShootingMetrics(state) {
         state.data = [];
      },
   },
});

export const {
   setShootingMetrics,
   addShootingMetric,
   updateShootingMetric,
   removeShootingMetric,
   clearShootingMetrics,
} = shootingMetricsSlice.actions;

export default shootingMetricsSlice.reducer;
