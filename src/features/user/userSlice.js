import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from 'react-toastify';
import customFetch from "../../utils/axios";
import { addUserToLocalStorage, getUserFromLocalStorage } from "../../utils/localStorage";



const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
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
  //action:
  'user/loginUser', 
  async (user, thunkApi) => {
    console.log(`Login User: ${JSON.stringify(user)}`)
    try {
      const resp = await customFetch.post('auth/login', user)
      return resp.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.msg)
    }
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
      addUserToLocalStorage(user)
      toast.success(`Hello There ${user.name}`);
    })
    .addCase(registerUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    })
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loginUser.fulfilled, (state, { payload }) => {
      console.log(payload)
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user)
      toast.success(`Welcome back ${user.name}`);
    })
    .addCase(loginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    })
    
  }
})


export default userSlice.reducer;