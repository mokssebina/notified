import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../supabase/supabaseClient'


export const editProfile = createAsyncThunk('editprofile/editProfile', async (profileData, { rejectWithValue }) => {

    try {
        const { data, error } = await supabase
        .from('user_profiles')
        .update({ "first_name": profileData.firstName, "last_name": profileData.lastName, "account_type": profileData.account, "phone_number": profileData.phoneNumber })
        .eq('user_id', profileData.userId)
        if (error) throw error;
        console.log("messages response: ", data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to sign in user.");
    }
}
)

const initialState = {
    editLoader: false,
    editData: null,
    editErrorMessage: '',
    editStatusCode: null
}

const editProfileSlice = createSlice({
    name: 'editprofile',
    initialState,
    reducers: {
        resetEditProfile: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(editProfile.pending, (state, action) => {
            state.editLoader = true
        })
        builder.addCase(editProfile.fulfilled, (state, action) => {
            state.editLoader = false
            state.editData = action.payload
        })
        builder.addCase(editProfile.rejected, (state, action) => {
            state.editLoader = false
            state.editErrorMessage = action.error.message
        })
    }
})

export const { resetEditProfile } = editProfileSlice.actions

export default editProfileSlice.reducer