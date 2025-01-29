import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: null,
  orderData: null,
  orderAllData: null,
  error: null,
};

export const CreateOrderProduct = createAsyncThunk(
  "order/Create_Ordert",
  async (updatedFormData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(orderStart());
      
      const response = await axios.post(`https://multi-vendor-project.vercel.app/api/order/Create_Order`,updatedFormData); 
      dispatch(orderSuccess(response.data));
      
      return response.data;
    } catch (error) {
      dispatch(orderFailur(error.message));
      return rejectWithValue(error.message);
    }
  }
);



export const getAllOrder = createAsyncThunk(
  "order/Get_All_Order",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(AllorderStart());
      
      const response = await axios.get(`https://multi-vendor-project.vercel.app/api/order/Get_All_Order`); 
      dispatch(AllorderSuccess(response.data));
      
      return response.data;
    } catch (error) {
      dispatch(AllorderFailur(error.message));
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderStart(state) {
      state.isLoading = true;
    },
    orderSuccess(state, action) {
      state.isLoading = false;
      state.orderData = action.payload?.data;
    },
    orderFailur(state, action) {
      state.isLoading = false;
      state.orderData = null;
      state.error = action.payload;
    },
    AllorderStart(state) {
      state.isLoading = true;
    },
    AllorderSuccess(state, action) {
      state.isLoading = false;
      state.orderAllData = action.payload?.allOrder;
    },
    AllorderFailur(state, action) {
      state.isLoading = false;
      state.orderAllData = null;
      state.error = action.payload;
    },
  }
});

export const { orderStart, orderSuccess, orderFailur,AllorderStart, AllorderSuccess, AllorderFailur } = orderSlice.actions;

export default orderSlice.reducer;
