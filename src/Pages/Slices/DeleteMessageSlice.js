import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const deleteMessage = createAsyncThunk("deleteMessage/deleteProjectMessage", async (id, { rejectWithValue }) => {
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

const deleteMessageSlice = createSlice({
    name: "deleteMessage",
    initialState,
    reducers: {
        resetDeleteMessage: (state,action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteMessage.pending, (state) => {
                state.deletedMessageLoading = true;
                state.deletedMessageError = null;
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.deletedMessageLoading = false;
                state.deletedMessage = action.payload;
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.deletedMessageLoading = false;
                state.deletedMessageError = action.error.message;
            })
    },
});

export const { resetDeleteMessage } = deleteMessageSlice.actions

export default deleteMessageSlice.reducer;

