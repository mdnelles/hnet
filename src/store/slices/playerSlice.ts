import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Player {
   id: number;
   player_name: string;
}

interface PlayerState {
   players: Player[];
}

const initialState: PlayerState = {
   players: [],
};

const playerSlice = createSlice({
   name: "player",
   initialState,
   reducers: {
      setPlayers(state, action: PayloadAction<Player[]>) {
         state.players = action.payload;
      },
      addPlayer(state, action: PayloadAction<Player>) {
         state.players.push(action.payload);
      },
      removePlayer(state, action: PayloadAction<number>) {
         state.players = state.players.filter((p) => p.id !== action.payload);
      },
      clearPlayers(state) {
         state.players = [];
      },
   },
});

export const { setPlayers, addPlayer, removePlayer, clearPlayers } =
   playerSlice.actions;

export default playerSlice.reducer;
