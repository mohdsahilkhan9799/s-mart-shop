import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: null,
  adminData: null,
  error: null,
};

export const getadminCategory = createAsyncThunk(
  "category/getcategory",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(adminStart());
      
      const response = await axios.get("https://multi-vendor-project.vercel.app/api/category/getcategory"); 
      dispatch(adminSuccess(response.data));
      
      return response.data;
    } catch (error) {
      dispatch(adminFailur(error.message));
      return rejectWithValue(error.message);
    }
  }
);
export const getadminBrand = createAsyncThunk(
  "product/get_Product",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(BrandStart());
      
      const response = await axios.get("https://multi-vendor-project.vercel.app/api/product/get_Product"); 
      dispatch(BrandSuccess(response.data));
      
      return response.data;
    } catch (error) {
      dispatch(BrandFailur(error.message));
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminStart(state) {
      state.isLoading = true;
    },
    adminSuccess(state, action) {
      state.isLoading = false;
      state.adminData = action.payload?.findCategoryData;
    },
    adminFailur(state, action) {
      state.isLoading = false;
      state.adminData = null;
      state.error = action.payload;
    },
    BrandStart(state) {
      state.isLoading = true;
    },
    BrandSuccess(state, action) {
      state.isLoading = false;
      state.BrandData = action.payload?.data;
    },
    BrandFailur(state, action) {
      state.isLoading = false;
      state.BrandData = null;
      state.error = action.payload;
    },
  }
});

export const { adminStart, adminSuccess, adminFailur,BrandStart, BrandSuccess, BrandFailur } = adminSlice.actions;

export default adminSlice.reducer;
