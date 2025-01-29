import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: null,
  venderData: null,
  venderSingleData: null,
  error: null,
};

export const getVenderProduct = createAsyncThunk(
  "vendor/getCategoryvenderProduct",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(VenderStart());
      
      const response = await axios.get(`https://multi-vendor-project.vercel.app/api/vendor/getCategoryvenderProduct/${id}`); 
      dispatch(VenderSuccess(response.data));
      
      return response.data;
    } catch (error) {
      dispatch(VenderFailur(error.message));
      return rejectWithValue(error.message);
    }
  }
);
export const getsinglduct = createAsyncThunk(
  "vendor/getsinglVenderPrduct",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(SingleVenderStart());
      
      const response = await axios.get(`https://multi-vendor-project.vercel.app/api/vendor/getsinglVenderPrduct/${id}`); 
      dispatch(SingleVenderSuccess(response.data));
      
      return response.data;
    } catch (error) {
      dispatch(SingleVenderFailur(error.message));
      return rejectWithValue(error.message);
    }
  }
);

const VenderSlice = createSlice({
  name: "Vender",
  initialState,
  reducers: {
    VenderStart(state) {
      state.isLoading = true;
    },
    VenderSuccess(state, action) {
      state.isLoading = false;
      state.venderData = action.payload?.data;
    },
    VenderFailur(state, action) {
      state.isLoading = false;
      state.venderData = null;
      state.error = action.payload;
    },
    SingleVenderStart(state) {
      state.isLoading = true;
    },
    SingleVenderSuccess(state, action) {
      state.isLoading = false;
      state.venderSingleData = action.payload?.data;
    },
    SingleVenderFailur(state, action) {
      state.isLoading = false;
      state.venderSingleData = null;
      state.error = action.payload;
    },
  }
});

export const { VenderStart, VenderSuccess, VenderFailur,SingleVenderStart, SingleVenderSuccess, SingleVenderFailur } = VenderSlice.actions;

export default VenderSlice.reducer;
