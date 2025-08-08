import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../supabase/supabaseClient'


export const verifyUserOtp = createAsyncThunk('verifyuserotp/verifyUserOtp', async (otpData, { rejectWithValue }) => {

    try {
        const { data, error } = await supabase.auth.verifyOtp({
            email: otpData?.email,
            token: otpData?.token,
            type: 'email',
        })
        if (error) throw error;
        console.log("messages response: ", data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to verify user otp.");
    }

})

const initialState = {
    verifyOtpLoader: false,
    verifyOtpMessage: '',
    verifyOtpErrorMessage: '',
    verifyOtpStatusCode: null
}

const verifyUserOtpSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        resetSigninUser: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(verifyUserOtp.pending, (state, action) => {
            state.verifyOtpLoader = true
        })
        builder.addCase(verifyUserOtp.fulfilled, (state, action) => {
            state.verifyOtpLoader = false
            state.verifyOtpMessage = action.payload
        })
        builder.addCase(verifyUserOtp.rejected, (state, action) => {
            state.verifyOtpLoader = false
            state.verifyOtpErrorMessage = action.error.message
        })
    }
})

export const { resetVerifyUserOtp } = verifyUserOtpSlice.actions

export default verifyUserOtpSlice.reducer