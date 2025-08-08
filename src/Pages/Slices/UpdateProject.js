import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const updateProject = createAsyncThunk("updateproject/updateProject", async (projectData, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from("projects")
            .update({
                "title": projectData?.title,
                "description": projectData?.description,
                "message_count": projectData?.messageCount,
            })
            .eq('key', projectData?.key)
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
    updatedProject: null,
    updatedProjectLoading: false,
    updatedProjectError: null,
}

const updateProjectSlice = createSlice({
    name: "updateprojectmessage",
    initialState,
    reducers: {
        resetUpdateProjects: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProject.pending, (state) => {
                state.updatedProjectLoading = true;
                state.updatedProjectError = null;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.updatedProjectLoading = false;
                state.updatedProject = action.payload;
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.updatedProjectLoading = false;
                state.updatedProjectError = action.error.message;
            })
    },
});

export const { resetUpdateProjects } = updateProjectSlice.actions

export default updateProjectSlice.reducer;

