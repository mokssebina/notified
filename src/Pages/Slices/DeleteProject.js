import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const deleteProject = createAsyncThunk("deleteproject/deleteProject", async (id, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from("projects")
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
    deleteProjectData: null,
    deleteProjectLoading: false,
    deleteProjectError: null,
}

const deleteProjectSlice = createSlice({
    name: "deleteproject",
    initialState,
    reducers: {
        resetDeleteProject: (state,action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteProject.pending, (state) => {
                state.deleteProjectLoading = true;
                state.deleteProjectError = null;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.deleteProjectLoading = false;
                state.deleteProjectData = action.payload;
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.deleteProjectLoading = false;
                state.deleteProjectError = action.error.message;
            })
    },
});

export const { resetDeleteProject } = deleteProjectSlice.actions

export default deleteProjectSlice.reducer;

