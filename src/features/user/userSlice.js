import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from 'react-toastify';
import customFetch from "../../utils/axios";

const initialState = {
  isLoading: false,
  user: null,
}


export const registerUser = createAsyncThunk(
  'user/registerUser', 
  async (user, thunkApi) => {
    console.log(`Register User: ${JSON.stringify(user)}`)
    try {
      const resp = await customFetch.post('auth/register', user)
      return resp.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
})

export const loginUser = createAsyncThunk(
  'user/loginUser', 
  async (user, thunkApi) => {
    console.log(`Login User: ${JSON.stringify(user)}`)
})


const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerUser.fulfilled, (state, { payload }) => {
      console.log(payload)
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      toast.success(`Hello There ${user.name}`);
    })
    .addCase(registerUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    })
  }
})


export default userSlice.reducer;