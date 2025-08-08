import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const getProjects = createAsyncThunk("getprojects/getProjects",async (id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq('user_id', id);

      if (error) throw error;
      console.log("messages response: ",data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cards");
    }
  }
);

const initialState = {
  projects: null,
  getProjectsLoading: false,
  getProjectsError: null,
}

const getProjectsSlice = createSlice({
  name: "getprojects",
  initialState,
  reducers: {
    resetGetProjects: (state, action) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.getProjectsLoading = true;
        state.getProjectsError = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.getProjectsLoading = false;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.getProjectsLoading = false;
        state.getProjectsError = action.error.message;
      })
  },
});

export const { resetGetProjects } = getProjectsSlice.actions

export default getProjectsSlice.reducer;

