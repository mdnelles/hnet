import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NonStationaryShooting {
   pid: number;
   pos?: string;
   od_col_bl?: number;
   od_col_br?: number;
   od_col_top?: number;
   od_15_bl?: number;
   od_15_br?: number;
   od_15_top?: number;
   move_col?: number;
   move_15?: number;
}

interface NonStationaryState {
   data: NonStationaryShooting[];
}

const initialState: NonStationaryState = {
   data: [],
};

const nonStationarySlice = createSlice({
   name: "nonStationary",
   initialState,
   reducers: {
      setNonStationaryData(
         state,
         action: PayloadAction<NonStationaryShooting[]>
      ) {
         state.data = action.payload;
      },
      addNonStationaryEntry(
         state,
         action: PayloadAction<NonStationaryShooting>
      ) {
         state.data.push(action.payload);
      },
      clearNonStationary(state) {
         state.data = [];
      },
   },
});

export const {
   setNonStationaryData,
   addNonStationaryEntry,
   clearNonStationary,
} = nonStationarySlice.actions;

export default nonStationarySlice.reducer;
