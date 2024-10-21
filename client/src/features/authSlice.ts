import { api } from "@/services/axiosClient";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { UserType } from "../../src/@types/userTypes";

type ChangeUserPayload = {
  user: UserType;
};

type AuthState = {
  user: UserType | null;
  token: string | null;
};

type SignInPayload = {
  identifier: string;
  password: string;
};

const initialState: AuthState = {
  user: null,
  token: null,
};

export const signInAsync = createAsyncThunk<AuthState, SignInPayload>(
  "user/signInAsync",
  async (payload: SignInPayload) => {
    try {
      const response = await api.post<AuthState>("auth/login", {
        identifier: payload.identifier,
        password: payload.password,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<ChangeUserPayload>) => {
      state.user = action.payload.user;
    },
    searchUser: (state) => {
      const userCookie = Cookies.get("auth_user");
      const tokenCookie = Cookies.get("auth_token");
      const isAuthenticated = state.user?.id !== null && state.token !== null;

      if (!isAuthenticated && userCookie && tokenCookie) {
        state.user = JSON.parse(userCookie);
        state.token = tokenCookie;
        api.defaults.headers.common["Authorization"] = `Bearer ${tokenCookie}`;
      }
    },
    logoutUser: (state) => {
      Cookies.remove("auth_user");
      Cookies.remove("auth_token");

      state.user = null;
      state.token = null;

      api.defaults.headers.common["Authorization"] = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.fulfilled, (state, action: PayloadAction<AuthState>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (state.token) {
          if (state.token) {
            Cookies.set("auth_token", state.token, { expires: 1 / 40 });
            Cookies.set("auth_user", JSON.stringify(state.user), { expires: 1 / 40 });
          }
          api.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
        }
      })
      .addCase(signInAsync.rejected, (state, action) => {
        console.error("Erro ao fazer login:", action.error.message);
        state.user = null;
        state.token = null;
        Cookies.remove("auth_user");
        Cookies.remove("auth_token");
      });
  },
});

export const { changeUser, searchUser, logoutUser } = authSlice.actions;
export const AuthReducer = authSlice.reducer;