import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
   id: number | null;
   email: string | null;
   name: string | null;
   token: string | null;
   userLevel: number | null;
   role: string | null;
   schoolId: number | null;
   avatarUrl: string | null;
   lang: "en" | "es";
   darkMode: boolean;
   loggedIn: boolean;
   demo: boolean;
   expiresAt: string | null;
}

const initialState: SessionState = {
   id: null,
   email: null,
   name: null,
   token: null,
   userLevel: null,
   role: null,
   schoolId: null,
   avatarUrl: null,
   lang: "en",
   darkMode: false,
   loggedIn: false,
   demo: false,
   expiresAt: null,
};

const sessionSlice = createSlice({
   name: "session",
   initialState,
   reducers: {
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

export const { login, logout, toggleDarkMode, setLang, updateProfile } =
   sessionSlice.actions;
export default sessionSlice.reducer;
