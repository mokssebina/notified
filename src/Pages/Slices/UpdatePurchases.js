import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const updatePurchases = createAsyncThunk("updatepurchases/updatePurchases", async (updateData, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from("purchases")
            .insert(updateData)
            .select()

        if (error) throw error;
        console.log("messages response: ", data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to update purchases");
    }
}
);

const initialState = {
    updatedPurchases: null,
    purchasesLoading: false,
    purchasesError: null,
}

const getUpdatePurchasesSlice = createSlice({
    name: "updatepurchases",
    initialState,
    reducers: {
        resetPurchaseUpdate: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updatePurchases.pending, (state) => {
                state.purchasesLoading = true;
            })
            .addCase(updatePurchases.fulfilled, (state, action) => {
                state.purchasesLoading = false;
                state.updatedPurchases = action.payload;
            })
            .addCase(updatePurchases.rejected, (state, action) => {
                state.purchasesLoading = false;
                state.purchasesError = action.error.message;
            })
    },
});

export const { resetPurchaseUpdate } = getUpdatePurchasesSlice.actions

export default getUpdatePurchasesSlice.reducer;

