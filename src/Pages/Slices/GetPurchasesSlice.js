import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const getPurchases = createAsyncThunk("getpurchases/getPurchases",async (id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
      .from("purchases")
      .select("*")
      .eq('user_id', id);

      if (error) throw error;
      console.log("response: ",data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cards");
    }
  }
);

const initialState = {
  purchases: null,
  purchasesLoading: false,
  getPurchasesError: null,
}

const getPurchasesSlice = createSlice({
  name: "getpurchases",
  initialState,
  reducers: {
    resetGetPurchases: (state, action) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPurchases.pending, (state) => {
        state.purchasesLoading = true;
        state.purchasesError = null;
      })
      .addCase(getPurchases.fulfilled, (state, action) => {
        state.purchasesLoading = false;
        state.purchases = action.payload;
      })
      .addCase(getPurchases.rejected, (state, action) => {
        state.purchasesLoading = false;
        state.getPurchasesError = action.payload.message;
      })
  },
});

export const { resetGetPurchases } = getPurchasesSlice.actions

export default getPurchasesSlice.reducer;

