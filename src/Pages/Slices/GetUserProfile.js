import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const getUserProfile = createAsyncThunk("getuserprofile/getUserProfile",async (id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
      .from("user_profiles")
      .select()
      .eq('user_id', id);

      if (error) throw error;
      console.log("messages response: ",data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cards");
    }
  }
);


const getUserProfileSlice = createSlice({
  name: "getuserprofile",
  initialState: {
    userProfile: [],
    profileLoading: false,
    profileError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.error.message;
      })
  },
});

export default getUserProfileSlice.reducer;

