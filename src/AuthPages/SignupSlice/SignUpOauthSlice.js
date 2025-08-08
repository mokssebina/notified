import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../supabase/supabaseClient'


export const signUpUserOauth = createAsyncThunk('signupoath/signUpUserOauth', async ({ rejectWithValue }) => {

    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          })
        if (error) throw error;
        console.log("messages response: ", data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to sign up user.");
    }
}
)

const initialState = {
    signUpOauthLoader: false,
    signUpOauthData: null,
    signUpOauthErrorMessage: '',
    signUpOauthStatusCode: null
}

const signUpUserOauthSlice = createSlice({
    name: 'signupoauth',
    initialState,
    reducers: {
        resetSignUpUserOauth: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUserOauth.pending, (state, action) => {
            state.signUpOauthLoader = true
        })
        builder.addCase(signUpUserOauth.fulfilled, (state, action) => {
            state.signUpOauthLoader = false
            state.signUpOauthData = action.payload
        })
        builder.addCase(signUpUserOauth.rejected, (state, action) => {
            state.signUpOauthLoader = false
            state.signUpOauthErrorMessage = action.error.message
        })
    }
})

export const { resetSignUpUserOauth } = signUpUserOauthSlice.actions

export default signUpUserOauthSlice.reducer