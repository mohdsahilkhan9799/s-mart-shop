import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: null,
  configdata: null,
  currentPage: 0,
  limit: 6,
};

const savedUserDetails = (userData) => {
  localStorage.setItem("token", userData.token);
  localStorage.setItem("email", userData.user.email);
};

export const RegisterUser = createAsyncThunk(
  "https://multi-vendor-project.vercel.app/api/customer/CustomeruserRegister",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      console.log("Slice formData value is:", formData);
      dispatch(configStart());
      const response = await axios.post(
        `https://multi-vendor-project.vercel.app/api/customer/CustomeruserRegister`,
        formData
      );
      dispatch(consfigSuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(configFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const LoginPost = createAsyncThunk(
  "https://multi-vendor-project.vercel.app/api/customer/CustomerUserLogin",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(LoginStart());
      const response = await axios.post(
        `https://multi-vendor-project.vercel.app/api/customer/CustomerUserLogin`,
        formData
      );
      const token = response.data.token; 
      if (token) {
        localStorage.setItem('token', token); 
      } else {
        console.error("No token received in response");
      }
      dispatch(LoginSuccess(response.data));
      savedUserDetails(response.data);
      console.log("The Login responsevalue is:", response);
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(LoginFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const getRegisterUser = createAsyncThunk(
  "customer/getCustomerRegisterUser", 
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(GetUserStart());

      const token = localStorage.getItem('token'); 

      const response = await axios.get(
        `https://multi-vendor-project.vercel.app/api/customer/getCustomerRegisterUser`,
        {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        }
      );
      console.log("API Response:", response.data); 
      dispatch(GetUserSuccess(response.data));
      console.log("The GetUser response value is:", response);
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(GetUserFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

const BookSlice = createSlice({
  name: "Bookpage",
  initialState,
  reducers: {
    configStart(state) {
      state.isLoading = true;
    },
    consfigSuccess(state, action) {
      state.isLoading = false;
      state.configdata = action.payload;
    },
    configFailure(state, action) {
      state.isLoading = false;
      state.configdata = null;
      state.error = action.payload;
    },
    LoginStart(state) {
      state.isLoading = true;
    },
    LoginSuccess(state, action) {
      state.isLoading = false;
      state.Logindata = action.payload;
    },
    LoginFailure(state, action) {
      state.isLoading = false;
      state.Logindata = null;
      state.error = action.payload;
    },
    GetUserStart(state) {
      state.isLoading = true;
    },
    GetUserSuccess(state, action) {
      state.isLoading = false;
      state.GetUserdata = action.payload?.user;
    },
    GetUserFailure(state, action) {
      state.isLoading = false;
      state.GetUserdata = null;
      state.error = action.payload;
    },
  },
});

export const {
  configStart,
  consfigSuccess,
  configFailure,
  LoginStart,
  LoginSuccess,
  LoginFailure,
  GetUserStart,
  GetUserSuccess,
  GetUserFailure,
} = BookSlice.actions;

export default BookSlice.reducer;
