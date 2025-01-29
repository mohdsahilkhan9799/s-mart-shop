import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from "../Slice/VenderSlice.js"; 
import adminReducer from "../Slice/AdminSlice.js";
import customerReducer from "../Slice/CustomerSlice.js";
import orderReducer from "../Slice/OrderSlice.js";

const store = configureStore({
  reducer: {
    vendor: vendorReducer, 
    Admin: adminReducer, 
    Customer: customerReducer, 
    Order: orderReducer, 
  },
});

export default store;
