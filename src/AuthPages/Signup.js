import React, { useEffect, useState } from 'react'

//////////////---Navigation imports---////////////////////
import { useNavigate } from 'react-router-dom'

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast'

//////////////---Screen imports---////////////////////
import AuthInput from './AuthComponents/AuthInput'

//////////////---Redux imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Formik imports---////////////////////
import { Formik, useFormik } from 'formik'

//////////////---Headless UI imports---////////////////////
import { Button } from '@headlessui/react'

//////////////---Material UI imports---////////////////////
import { CircularProgress } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';

//////////////---Context imports---////////////////////
import { useAuth } from '../Context/AuthContext'

//////////////---Validation imports---////////////////////
import * as Yup from 'yup'

//////////////---API imports---////////////////////
import { signUpUser, resetSignUpUser } from './SignupSlice/SignUpUserSlice';
import { signUpUserOauth, resetSignUpUserOauth } from './SignupSlice/SignUpOauthSlice';

//////////////---Image imports---////////////////////
import logoImage from '../Assets/images/notified_logo-02.png'




const Signup = () => {

    const { loading } = useAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { signUpData, signUpLoader, signUpErrorMessage, signUpStatusCode } = useSelector((state) => state.signup);

    const [password, setPassword] = useState(false)
    const [show, setShow] = useState(false)

    const continueSignUp = () => {
        console.log("show password")
        setPassword(!password)
    }

    let validation = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required()
    })

    const authSignipFormik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validation,
        onSubmit: values => {
            console.log("sign up values: ", values)
            dispatch(signUpUser({
                userEmail: values.email,
                userPassword: values.password
            }))
        }
    })

    const handleChange = () => {
        console.log("pressed value: ", show)
        setShow(!show)
    }

    const authOSignUp = () => {
        console.log("sign up with provider")
        dispatch(signUpUserOauth())
    }

    const goHome = () => {
        navigate('/')
    }

    useEffect(() => {

        if (signUpErrorMessage) {
            console.log("sign up error: ", signUpErrorMessage)
            toast.error(signUpErrorMessage)
        }

        if (signUpData) {
            console.log("sign up error: ", signUpData)
            toast.success('A confirmation message has been sent to your email')
            setTimeout(() => {
                navigate('/signin')
            }, 2000)
        }

        return () => dispatch(resetSignUpUser())

    }, [signUpData])


    return (
        <div className='w-screen h-screen flex flex-col bg-background'>

            <div className='relative w-full md:w-[350px] lg:w-[500px] m-auto py-16 px-[90px] space-y-3 border border-primary/30 shadow-lg shadow-primary/40 rounded-lg'>

                <form onSubmit={authSignipFormik.handleSubmit} className='w-full flex flex-col'>

                    <div onClick={goHome} className='w-48 h-16 mx-auto mb-9 cursor-pointer'>
                        <img className='w-full aspect-auto' alt='logo-image' src={logoImage} />
                    </div>

                    <AuthInput
                        label={'Email'}
                        type={'email'}
                        placeholder={'Enter your email'}
                        name={'email'}
                        value={authSignipFormik?.values.email}
                        onChange={authSignipFormik?.handleChange('email')}
                        touched={authSignipFormik?.touched.email}
                        error={(authSignipFormik.touched.email && authSignipFormik.errors.email) && authSignipFormik.errors.email}
                    />

                    {password &&
                        <>
                            <AuthInput
                                label={'Password'}
                                type={show ? 'text' : 'password'}
                                placeholder={'Enter your password'}
                                name={'password'}
                                value={authSignipFormik?.values.password}
                                onChange={authSignipFormik?.handleChange('password')}
                                touched={authSignipFormik?.touched.password}
                                error={(authSignipFormik.touched.password && authSignipFormik.errors.password) && authSignipFormik.errors.password}
                            />

                            <div className='w-full h-5 mt-3 mb-3 flex flex-row space-x-4'>
                                <input disabled={!authSignipFormik?.values.password} className='w-5 h-5' type='checkbox' checked={show} onChange={handleChange} />
                                <p className='text-sm font-semibold text-foreground ml-3'>Show password</p>
                            </div>
                        </>
                    }

                    {!password &&
                        <button type='button' onClick={continueSignUp} disabled={!authSignipFormik?.values.email} className="relative w-full sm:w-80 h-12 mx-auto rounded-lg bg-primary py-2 px-4 text-sm mt-8 text-white cursor-pointer">
                            {'Continue →'}
                        </button>
                    }

                    {password &&
                        <button type='submit' className="relative w-full sm:w-80 h-12 mx-auto rounded-lg bg-primary py-2 px-4 text-sm mt-8 text-white">
                            {signUpLoader ? <CircularProgress size={20} color='#ffffff' /> : 'Sign up'}
                        </button>
                    }

                    <div className='w-full flex flex-row mt-4'>
                        <p className='text-sm text-foreground mr-1'>Already have an account?</p>
                        <p onClick={() => navigate('/signin')} className='text-sm text-primary hover:underline cursor-pointer'>Signin here.</p>
                    </div>

                </form>
                {/*
                <div className='w-auto flex flex-row items-center my-12'>
                    <div className='w-2/5 h-6'>
                        <div className='h-3 border-b border-slate-400'></div>
                    </div>
                    <div className='w-1/5 h-6 text-center items-center'>
                        OR
                    </div>
                    <div className='w-2/5 h-6'>
                        <div className='h-3 border-b border-slate-400'></div>
                    </div>
                </div>

                <button type='button' onClick={authOSignUp} className="relative w-full sm:w-80 h-12 mx-auto rounded-lg bg-white border border-gray-950 py-2 px-4 text-sm mt-14 text-white data-[hover]:bg-gray-800 cursor-pointer">
                    <div className='w-auto flex flex-row items-center px-4'>
                        <GoogleIcon sx={{ color: '#000000' }} /> <p className='ml-3 text-gray-950'>Continue with Google</p>
                    </div>
                </button>
                */}
            </div>

        </div>
    )
}

export default Signup