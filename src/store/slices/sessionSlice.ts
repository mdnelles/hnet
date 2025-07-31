import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
   id: number | null;
   email: string | null;
   name: string | null;
   token: string | null;
   userLevel: number | null;
   lang: "en" | "es";
   darkMode: boolean;
   isDrawerOpen?: boolean;
   loggedIn: boolean;
   demo: boolean;
   expiresAt: string | null;
   user: {
      id: number;
      email: string;
      name: string;
      token: string;
      userLevel: number;
   };
}

export const initialState: SessionState = {
   id: null,
   email: null,
   name: null,
   token: null,
   userLevel: null,
   lang: "en",
   darkMode: false,
   isDrawerOpen: false,
   loggedIn: false,
   demo: false,
   expiresAt: null,
   user: {
      id: 0,
      email: "",
      name: "",
      token: "",
      userLevel: 0,
   },
};

const sessionSlice = createSlice({
   name: "session",
   initialState,
   reducers: {
      setSession(state, action: PayloadAction<Partial<SessionState>>) {
         Object.assign(state, action.payload);
         state.loggedIn = true;
      },
      setSessionToken(state, action: PayloadAction<string | null>) {
         state.token = action.payload;
         state.loggedIn = !!action.payload;
      },
      login(state, action: PayloadAction<Partial<SessionState>>) {
         Object.assign(state, action.payload);
         state.loggedIn = true;
      },
      logout(state) {
         Object.assign(state, initialState);
      },
      toggleDarkMode(state) {
         state.darkMode = !state.darkMode;
      },
      setLang(state, action: PayloadAction<"en" | "es">) {
         state.lang = action.payload;
      },
      updateProfile(state, action: PayloadAction<Partial<SessionState>>) {
         Object.assign(state, action.payload);
      },
   },
});

export const {
   login,
   logout,
   toggleDarkMode,
   setLang,
   updateProfile,
   setSession,
} = sessionSlice.actions;
export default sessionSlice.reducer;
