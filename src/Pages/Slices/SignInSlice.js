import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../supabase/supabaseClient'


export const signInUser = createAsyncThunk('signin/signInUser', async (user, { rejectWithValue }) => {

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: user.userEmail,
            password: user.userPassword
          })
        if (error) throw error;
        console.log("messages response: ", data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to sign in user.");
    }
}
)

const initialState = {
    signinLoader: false,
    signinData: null,
    signinErrorMessage: '',
    signinStatusCode: null
}

const signInUserSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        resetSigninUser: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signInUser.pending, (state, action) => {
            state.signinLoader = true
        })
        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.signinLoader = false
            state.signinData = action.payload
        })
        builder.addCase(signInUser.rejected, (state, action) => {
            state.signinLoader = false
            state.signinErrorMessage = action.error.message
        })
    }
})

export const { resetSigninUser } = signInUserSlice.actions

export default signInUserSlice.reducer