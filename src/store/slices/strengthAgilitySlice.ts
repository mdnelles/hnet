import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StrengthAgility {
   pid: number;
   pos?: string;
   lane?: number; // Lane Agility Time (seconds)
   shut?: number; // Shuttle Run (seconds)
   sprint?: number; // 3/4 Sprint (seconds)
   svl?: number; // Standing Vertical Leap (inches)
   mvl?: number; // Max Vertical Leap (inches)
   bench?: number; // Bench Press reps
}

interface StrengthAgilityState {
   data: StrengthAgility[];
}

const initialState: StrengthAgilityState = {
   data: [],
};

const strengthAgilitySlice = createSlice({
   name: "strengthAgility",
   initialState,
   reducers: {
      setStrengthAgilityData(state, action: PayloadAction<StrengthAgility[]>) {
         state.data = action.payload;
      },
      addStrengthAgilityEntry(state, action: PayloadAction<StrengthAgility>) {
         state.data.push(action.payload);
      },
      updateStrengthAgilityEntry(
         state,
         action: PayloadAction<StrengthAgility>
      ) {
         const index = state.data.findIndex(
            (entry) => entry.pid === action.payload.pid
         );
         if (index !== -1) {
            state.data[index] = action.payload;
         }
      },
      removeStrengthAgilityEntry(state, action: PayloadAction<number>) {
         state.data = state.data.filter(
            (entry) => entry.pid !== action.payload
         );
      },
      clearStrengthAgilityData(state) {
         state.data = [];
      },
   },
});

export const {
   setStrengthAgilityData,
   addStrengthAgilityEntry,
   updateStrengthAgilityEntry,
   removeStrengthAgilityEntry,
   clearStrengthAgilityData,
} = strengthAgilitySlice.actions;

export default strengthAgilitySlice.reducer;
