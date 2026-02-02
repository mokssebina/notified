import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../supabase/supabaseClient'


export const updateProfileCredits = createAsyncThunk('updateprofilecredits/updateProfileCredits', async (profileData, { rejectWithValue }) => {

    try {
        const { data, error } = await supabase
        .from('user_profiles')
        .update({ "credits": profileData.credits })
        .eq('user_id', profileData.userId)
        .select()

        if (error) throw error;
        console.log("profile credits update response: ", data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to sign in user.");
    }
})

const initialState = {
    updateCreditsLoader: false,
    updateCreditsData: null,
    updateCreditsErrorMessage: '',
    updateCreditsStatusCode: null
}

const updateProfileCreditsSlice = createSlice({
    name: 'updateprofilecredits',
    initialState,
    reducers: {
        resetUpdateProfileCredits: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateProfileCredits.pending, (state, action) => {
            state.updateCreditsLoader = true
        })
        builder.addCase(updateProfileCredits.fulfilled, (state, action) => {
            state.updateCreditsLoader = false
            state.updateCreditsData = action.payload
        })
        builder.addCase(updateProfileCredits.rejected, (state, action) => {
            state.updateCreditsLoader = false
            state.updateCreditsErrorMessage = action.error.message
        })
    }
})

export const { resetUpdateProfileCredits } = updateProfileCreditsSlice.actions

export default updateProfileCreditsSlice.reducer