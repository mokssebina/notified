import React from 'react'

//////////////---Redux imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Material UI imports---////////////////////
import { CircularProgress } from '@mui/material'

//////////////---OTP imports---////////////////////
import OtpInput from 'react-otp-input';

//////////////---Formik imports---////////////////////
import { Formik, useFormik } from 'formik'

//////////////---Yup imports---////////////////////
import * as Yup from 'yup'

//////////////---API imports---////////////////////
import { verifyUserOtp } from './SigninSlice.js/verifyOtpSlice';


const VerifyOtp = ({ email }) => {

    const { verifyOtpLoader, verifyOtpMessage, verifyOtpErrorMessage, verifyOtpStatusCode } = useSelector(state => state.verifyuserotp)

    let validation = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required()
    })

    const verifyOtpFormik = useFormik({
        initialValues: {
            otp: ''
        },
        validationSchema: validation,
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            let otpData = {
                email: email, 
                otp:values.otp
            }
            verifyUserOtp(otpData)
        }
    })

    return (
        <form onSubmit={verifyOtpFormik?.handleSubmit} className='relative w-full md:w-[350px] lg:w-[500px] flex flex-col m-auto py-16 px-[90px] space-y-3 border border-gray-950 rounded-lg'>
            
            <div className='w-44 h-16 bg-slate-500 mx-auto mb-9'></div>

            <OtpInput
                value={verifyOtpFormik?.values.otp}
                onChange={verifyOtpFormik?.handleChange('otp')}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
            />

            <button type='submit' className="w-full h-12 rounded bg-gray-950 py-2 px-4 text-sm mt-14 text-white data-[hover]:bg-gray-800">
                {verifyOtpLoader ? <CircularProgress size={20} color='#ffffff' /> : 'Verify OTP'}
            </button>

        </form>
    )
}

export default VerifyOtp