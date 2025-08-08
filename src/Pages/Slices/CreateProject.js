import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const createProject = createAsyncThunk("createproject/createProject", async (projectData, { rejectWithValue }) => {

    try {

        const { data, error } = await supabase
            .from("projects")
            .insert(projectData)
            .select()

        console.log("create project")
        
        if (error) throw error;
        console.log("response: ", data)
        return data;

    } catch (error) {
        return rejectWithValue(error.message || "Failed to submit message");
    }

})

const initialState = {
    createProjectResponse: null,
    createProjectLoading: false,
    createProjectError: null,
  }

const createProjectSlice = createSlice({
    name: "createproject",
  initialState,
  reducers: {
    resetCreateProject: (state, action) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.createProjectLoading = true;
        state.createProjectError = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.createProjectLoading = false;
        state.createProjectResponse = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.createProjectLoading = false;
        state.createProjectError = action.error.message;
      })
  },
})

export const { resetCreateProject } = createProjectSlice.actions

export default createProjectSlice.reducer