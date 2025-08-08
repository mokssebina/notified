import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const editProject = createAsyncThunk("editproject/editProject", async (projectData, { rejectWithValue }) => {

    try {

        const { data, error } = await supabase
            .from("projects")
            .update({ 
                title: projectData?.title,
                description: projectData?.description
            })
            .eq('id', projectData?.id)
            .select()

        if (error) throw error;
        console.log("response: ", data)
        return data;

    } catch (error) {
        return rejectWithValue(error.message || "Failed to submit message");
    }

})

const initialState = {
    editProjectResponse: null,
    editProjectLoading: false,
    editProjectError: null,
}

const editProjectSlice = createSlice({
    name: "editproject",
    initialState,
    reducers: {
        resetEditProject: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(editProject.pending, (state) => {
                state.editProjectLoading = true;
                state.editProjectError = null;
            })
            .addCase(editProject.fulfilled, (state, action) => {
                state.editProjectLoading = false;
                state.editProjectResponse = action.payload;
            })
            .addCase(editProject.rejected, (state, action) => {
                state.editProjectLoading = false;
                state.editProjectError = action.error.message;
            })
    },
})

export const { resetEditProject } = editProjectSlice.actions

export default editProjectSlice.reducer