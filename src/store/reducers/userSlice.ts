import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isAdmin: boolean;
}

const initialState: UserState = {
  isAdmin: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleUserMode: (state) => {
      state.isAdmin = !state.isAdmin;
    },
  },
});

export const { toggleUserMode } = userSlice.actions;
export default userSlice.reducer;
