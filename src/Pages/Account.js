import React, { useState, useEffect } from 'react'

//////////////---Headless ui imports---////////////////////
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

//////////////---Redux imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast'

//////////////---Material UI imports---////////////////////
import { Edit, CloseOutlined } from '@mui/icons-material'

//////////////---Context imports---////////////////////
import { useAuth } from '../Context/AuthContext'

//////////////---Formik imports---////////////////////
import { Formik, useFormik } from 'formik'

//////////////---Validation imports---////////////////////
import * as Yup from 'yup'

//////////////---Screen imports---////////////////////
import PageHeader from '../Components/LayoutElements/PageHeader'
import SimpleInput from '../Components/Inputs/SimpleInput'

//////////////---API imports---////////////////////
import { editProfile } from './Slices/EditProfileUpdate';



const Account = () => {

  const dispatch = useDispatch()
  const { userProfile, profileLoading, profileError } = useSelector((state) => state.getuserprofile);
  const { editLoader, editData, editErrorMessage, editStatusCode } = useSelector((state) => state.editprofile);

  const [edit, setEdit] = useState(true)

  let validation = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().required(),
    email: Yup.string().required(),
    phoneNumber: Yup.string(),
    accountType: Yup.string().required(),
  })

  const accountDetails = useFormik({
    initialValues: {
      firstName: userProfile ? userProfile[0]?.name : '',
      lastName: userProfile ? userProfile[0]?.last_name : '',
      email: userProfile ? userProfile[0]?.email : '',
      phoneNumber: userProfile ? userProfile[0]?.phone_number : '',
      accountType: userProfile ? userProfile[0]?.account_type : ''
    },
    validationSchema: validation,
    onSubmit: values => {
      console.log()
      let userDetails = {
        firstName: values.firstName,
        lastName: values.password,
        email: values.email,
        phoneNumber: values.phoneNumber,
        account: values.accountType
      }
      dispatch(editProfile(userDetails))
    }
  })

  useEffect(() => {
    if (userProfile) {
      console.log("user profile: ", userProfile)
    }
  }, [userProfile])

  useEffect(() => {
    if (!edit) {
      accountDetails?.resetForm()
    }
  }, [edit])


  return (
    <div className='relative w-full flex flex-col p-4'>

      <div className='w-full lg:w-10/12 h-24 flex flex-col py-4 mt-10 mx-auto'>

        <PageHeader title={'Account'} />

        <div className='w-full flex flex-col p-2 mt-10 border border-gray-950 rounded-lg'>

          <div className='w-full px-2'>

            <div className='w-full flex flex-row py-3 border-b border-gray-950'>

              <p className='font-semibold text-base my-2 md:text-lg'>Personal Information</p>

              <button onClick={() => setEdit(!edit)} className='relative h-12 py-3 px-3 ml-auto rounded border border-slate-950 text-slate-950 align-middle'>
                <div className='flex flex-row space-x-2 align-middle'>
                  {edit ?
                    <>
                      <Edit />
                      <p>Edit</p>
                    </>
                    :
                    <>
                      <CloseOutlined />
                      <p>Cancel</p>
                    </>
                  }
                </div>
              </button>

            </div>

          </div>

          <form className='w-full h-auto mt-6 pb-8' onSubmit={accountDetails?.handleSubmit}>

            <div className='w-full py-3 flex flex-col md:flex-row'>

              <div className='w-full md:w-1/2 lg:w-1/3 px-2'>
                <SimpleInput
                  disabled={edit}
                  label={'First Name'}
                  type={'text'}
                  placeholder={''}
                  name={'firstName'}
                  value={accountDetails?.values.firstName}
                  onChange={accountDetails?.handleChange('firstName')}
                  touched={accountDetails?.touched.firstName}
                  error={(accountDetails?.touched.firstName && accountDetails?.errors.firstName) && accountDetails?.errors.firstName}
                />
              </div>

              <div className='w-full md:w-1/2 lg:w-1/3 px-2'>
                <SimpleInput
                  disabled={edit}
                  label={'Last Name'}
                  type={'text'}
                  placeholder={''}
                  name={'lastName'}
                  value={accountDetails?.values.lastName}
                  onChange={accountDetails?.handleChange('lastName')}
                  touched={accountDetails?.touched.lastName}
                  error={(accountDetails?.touched.lastName && accountDetails?.errors.lastName) && accountDetails?.errors.lastName}
                />
              </div>

              <div className='w-full md:w-1/2 lg:w-1/3 px-2'>
                <SimpleInput
                  disabled={edit}
                  label={'email'}
                  type={'text'}
                  placeholder={''}
                  name={'email'}
                  value={accountDetails?.values.email}
                  onChange={accountDetails?.handleChange('email')}
                  touched={accountDetails?.touched.email}
                  error={(accountDetails?.touched.email && accountDetails?.errors.email) && accountDetails?.errors.email}
                />
              </div>

            </div>

            <div className='w-full py-3 flex flex-col md:flex-row'>

              <div className='w-full md:w-1/2 lg:w-1/3 px-2'>
                <SimpleInput
                  disabled={edit}
                  label={'Phone Number(with country code)'}
                  type={'text'}
                  placeholder={''}
                  name={'phoneNumber'}
                  value={accountDetails?.values.phoneNumber}
                  onChange={accountDetails?.handleChange('phoneNumber')}
                  touched={accountDetails?.touched.phoneNumber}
                  error={(accountDetails?.touched.phoneNumber && accountDetails?.errors.phoneNumber) && accountDetails?.errors.phoneNumber}
                />
              </div>
              <div className='w-full md:w-1/2 lg:w-1/3 px-2'>
                <SimpleInput
                  disabled={edit}
                  label={'Account Type'}
                  type={'text'}
                  placeholder={''}
                  name={'accountType'}
                  value={accountDetails?.values.accountType}
                  onChange={accountDetails?.handleChange('accountTyper')}
                  touched={accountDetails?.touched.accountType}
                  error={(accountDetails?.touched.accountType && accountDetails?.errors.accountType) && accountDetails?.errors.accountType}
                />
              </div>
              <div className='w-full md:w-1/2 lg:w-1/3 px-2'></div>

            </div>

            {!edit &&
              <div className='w-full flex flex-row'>

                <button type='submit' className='relative h-12 px-4 ml-auto rounded-lg border bg-slate-950 text-white align-middle'>
                  {'Update Details'}
                </button>

              </div>
            }

          </form>

        </div>

      </div>

    </div>
  )
}

export default Account