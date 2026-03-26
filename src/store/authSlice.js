import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, fetchUserProfile, updateUserProfile } from "../services/api";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    const data = await loginUser(email, password);
    if (data.status !== 200) {
      return rejectWithValue("Invalid email or password");
    }
    return data.body.token;
  }
);

export const fetchProfileThunk = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const data = await fetchUserProfile(token);
    return data.body;
  }
);

export const updateUsernameThunk = createAsyncThunk(
  "auth/updateUsername",
  async (userName, { getState }) => {
    const token = getState().auth.token;
    const data = await updateUserProfile(token, userName);
    return data.body;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
    isLoggedIn: !!localStorage.getItem("token"),
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
        state.error = null;
        localStorage.setItem("token", action.payload);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.payload || "Unable to connect to the server";
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUsernameThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
