import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const updateProjectMessage = createAsyncThunk("updateprojectmessage/updateProjectMessage", async (messageData, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from("feature_messages")
            .update({
                "is_active": messageData?.enabled,
                "project_key": messageData?.projectKey,
                "type": messageData?.messageType,
                "route": messageData?.route,
                "title": messageData?.title,
                "content": messageData?.content,
                "position": messageData?.position,
                "backgroundColor": messageData?.backgroundColor,
                "textColor": messageData?.textColor,
                "borderColor": messageData?.textColor,
                "click_action": messageData?.click_action,
                "click_url": messageData?.click_url,
            })
            .eq('id', messageData?.id)
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
    updatedMessage: null,
    updatedMessageLoading: false,
    updatedMessageError: null,
}

const updateCardMessageSlice = createSlice({
    name: "updateprojectmessage",
    initialState,
    reducers: {
        resetUpdateMessageResponse: (state, action) => {
            state.updatedMessage = null
        },
        resetUpdateMessage: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProjectMessage.pending, (state) => {
                state.updatedMessageLoading = true;
                state.updatedMessageError = null;
            })
            .addCase(updateProjectMessage.fulfilled, (state, action) => {
                state.updatedMessageLoading = false;
                state.updatedMessage = action.payload;
            })
            .addCase(updateProjectMessage.rejected, (state, action) => {
                state.updatedMessageLoading = false;
                state.updatedMessageError = action.error.message;
            })
    },
});

export const { resetUpdateMessageResponse, resetUpdateMessage } = updateCardMessageSlice.actions

export default updateCardMessageSlice.reducer;

