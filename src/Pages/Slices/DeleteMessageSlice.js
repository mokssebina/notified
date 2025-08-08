import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const deleteProjectMessage = createAsyncThunk("deleteprojectMessage/deleteProjectMessage", async (id, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from("feature_messages")
            .delete()
            .eq('id', id)
            .select()

        if (error) throw error;
        console.log("messages response: ", data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch cards");
    }
}
);

const initialState = {
    deletedMessage: null,
    deletedMessageLoading: false,
    deletedMessageError: null,
}

const deleteProjectMessageSlice = createSlice({
    name: "deleteprojectMessage",
    initialState,
    reducers: {
        resetDeleteCardMessage: (state,action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteProjectMessage.pending, (state) => {
                state.deletedMessageLoading = true;
                state.deletedMessageError = null;
            })
            .addCase(deleteProjectMessage.fulfilled, (state, action) => {
                state.deletedMessageLoading = false;
                state.deletedMessage = action.payload;
            })
            .addCase(deleteProjectMessage.rejected, (state, action) => {
                state.deletedMessageLoading = false;
                state.deletedMessageError = action.error.message;
            })
    },
});

export const { resetDeleteCardMessage } = deleteProjectMessageSlice.actions

export default deleteProjectMessageSlice.reducer;

