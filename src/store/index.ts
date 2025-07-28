import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Slice imports
import sessionReducer from "./slices/sessionSlice";
import nonStationaryReducer from "./slices/nonStationarySlice";
import playerReducer from "./slices/playerSlice";
import playerMetricsReducer from "./slices/playerMetricsSlice";
import shootingMetricsReducer from "./slices/shootingMetricsSlice";
import spotUpShootingReducer from "./slices/spotUpShootingSlice";
import strengthAgilityReducer from "./slices/strengthAgilitySlice";

// Store setup
export const store = configureStore({
   reducer: {
      session: sessionReducer,
      nonStationary: nonStationaryReducer,
      player: playerReducer,
      playerMetrics: playerMetricsReducer,
      shootingMetrics: shootingMetricsReducer,
      spotUpShooting: spotUpShootingReducer,
      strengthAgility: strengthAgilityReducer,
   },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
