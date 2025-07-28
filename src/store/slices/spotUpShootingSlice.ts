import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SpotUpShooting {
   pid: number;
   pos?: string;
   nba_bl?: number;
   nba_br?: number;
   nba_cl?: number;
   nba_cr?: number;
   nba_top?: number;
   col_bl?: number;
   col_br?: number;
   col_cl?: number;
   col_cr?: number;
   col_top?: number;
   ft_bl?: number;
   ft_br?: number;
   ft_cl?: number;
   ft_cr?: number;
   ft_top?: number;
}

interface SpotUpShootingState {
   data: SpotUpShooting[];
}

const initialState: SpotUpShootingState = {
   data: [],
};

const spotUpShootingSlice = createSlice({
   name: "spotUpShooting",
   initialState,
   reducers: {
      setSpotUpData(state, action: PayloadAction<SpotUpShooting[]>) {
         state.data = action.payload;
      },
      addSpotUpEntry(state, action: PayloadAction<SpotUpShooting>) {
         state.data.push(action.payload);
      },
      updateSpotUpEntry(state, action: PayloadAction<SpotUpShooting>) {
         const index = state.data.findIndex(
            (s) => s.pid === action.payload.pid
         );
         if (index !== -1) {
            state.data[index] = action.payload;
         }
      },
      removeSpotUpEntry(state, action: PayloadAction<number>) {
         state.data = state.data.filter((s) => s.pid !== action.payload);
      },
      clearSpotUpData(state) {
         state.data = [];
      },
   },
});

export const {
   setSpotUpData,
   addSpotUpEntry,
   updateSpotUpEntry,
   removeSpotUpEntry,
   clearSpotUpData,
} = spotUpShootingSlice.actions;

export default spotUpShootingSlice.reducer;
