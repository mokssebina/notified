import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const getProjectMessages = createAsyncThunk("getprojectMessages/getProjectMessages",async (key, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
      .from("feature_messages")
      .select("*")
      .eq('project_key', key);

      if (error) throw error;
      console.log("messages response: ",data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cards");
    }
  }
);

const initialState = {
  projectMessages: null,
  projectMessagesLoading: false,
  projectMessagesError: null,
}

const getProjectMessagesSlice = createSlice({
  name: "getprojectMessages",
  initialState,
  reducers: {
    resetGetProjectMessages: (state, action) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectMessages.pending, (state) => {
        state.projectMessagesLoading = true;
      })
      .addCase(getProjectMessages.fulfilled, (state, action) => {
        state.projectMessagesLoading = false;
        state.projectMessages = action.payload;
      })
      .addCase(getProjectMessages.rejected, (state, action) => {
        state.projectMessagesLoading = false;
        state.projectMessagesError = action.error.message;
      })
  },
});

export const { resetGetProjectMessages } = getProjectMessagesSlice.actions

export default getProjectMessagesSlice.reducer;

