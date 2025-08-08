import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../supabase/supabaseClient'


export const signUpUser = createAsyncThunk('signup/signUpUser', async (user, { rejectWithValue }) => {

    try {
        const { data, error } = await supabase.auth.signUp({
            email: user.userEmail,
            password: user.userPassword
        })
        console.log("User payload: ", user);
        if (error) throw error;
        console.log("messages response: ", data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to sign up user.");
    }
}
)

const initialState = {
    signUpLoader: false,
    signUpData: null,
    signUpErrorMessage: '',
    signUpStatusCode: null
}

const signUpUserSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        resetSignUpUser: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state, action) => {
            state.signUpLoader = true
        })
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.signUpLoader = false
            state.signUpData = action.payload
        })
        builder.addCase(signUpUser.rejected, (state, action) => {
            state.signUpLoader = false
            state.signUpErrorMessage = action.error.message
        })
    }
})

export const { resetSignUpUser } = signUpUserSlice.actions

export default signUpUserSlice.reducer