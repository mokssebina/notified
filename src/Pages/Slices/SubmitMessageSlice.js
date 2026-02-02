import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const submitProjectMessage = createAsyncThunk("submitmessage/submitProjectMessage", async (messageData, { rejectWithValue }) => {
  try {

    const { data, error } = await supabase
      .from("feature_messages")
      .insert({
        "is_active": messageData?.enabled,
        "project_key": messageData?.projectKey,
        "project_id": messageData.projectId,
        "type": messageData?.messageType,
        "route": messageData?.route,
        "title": messageData?.title,
        "content": messageData?.content,
        "position": messageData?.position,
        "backgroundColor": messageData?.backgroundColor,
        "textColor": messageData?.textColor,
        "borderColor": messageData?.textColor,
        "width": messageData?.width,
        "borderWidth": messageData?.borderWidth,
        "click_action": messageData?.click_action,
        "click_url": messageData?.click_url,
        "created_at": new Date()
      })
      .select()

    if (error) throw error;
    console.log("response: ", data)
    return data;

  } catch (error) {
    return rejectWithValue(error.message || "Failed to submit message");
  }
}
);

const initialState = {
  submitMessageResponse: null,
  submitMessageLoading: false,
  submitMessageError: null,
}

const submitMessageSlice = createSlice({
  name: "submitmessage",
  initialState,
  reducers: {
    resetSubmitMessage: (state, action) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitProjectMessage.pending, (state) => {
        state.submitMessageLoading = true;
        state.submitMessageError = null;
      })
      .addCase(submitProjectMessage.fulfilled, (state, action) => {
        state.submitMessageLoading = false;
        state.submitMessageResponse = action.payload;
      })
      .addCase(submitProjectMessage.rejected, (state, action) => {
        state.submitMessageLoading = false;
        state.submitMessageError = action.error.message;
      })
  },
});

export const { resetSubmitMessage } = submitMessageSlice.actions

export default submitMessageSlice.reducer;

