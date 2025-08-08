import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../supabase/supabaseClient'


export const updateProfile = createAsyncThunk('updateprofile/updateProfile', async (profileData, { rejectWithValue }) => {

    try {
        const { data, error } = await supabase
        .from('profiles')
        .update({ first_name: profileData.firstName, last_name: profileData.lastName, user_name: profileData.name, credits: 0 })
        .eq('id', profileData.userId)
        if (error) throw error;
        console.log("messages response: ", data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to sign in user.");
    }
}
)

const initialState = {
    updateLoader: false,
    updateData: null,
    updateErrorMessage: '',
    updateStatusCode: null
}

const updateProfileSlice = createSlice({
    name: 'updateprofile',
    initialState,
    reducers: {
        resetUpdateProfile: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateProfile.pending, (state, action) => {
            state.updateLoader = true
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.updateLoader = false
            state.updateData = action.payload
        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.updateLoader = false
            state.updateErrorMessage = action.error.message
        })
    }
})

export const { resetUpdateProfile } = updateProfileSlice.actions

export default updateProfileSlice.reducer