import React, { useEffect } from 'react'

//////////////---Context imports---////////////////////
import { useAuth } from '../../Context/AuthContext';

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast'

//////////////---Formik imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Material UI imports---////////////////////
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from '@mui/material';

//////////////---Icon imports---////////////////////
import PaymentsIcon from '@mui/icons-material/Payments';

//////////////---API imports---////////////////////
import { getUserProfile } from '../../Pages/Slices/GetUserProfile';

//////////////---Data imports---////////////////////



const Header = ({ showNav, device }) => {

  const { session } = useAuth()
  const dispatch = useDispatch()
  const { userProfile, profileLoading, profileError } = useSelector((state) => state.getuserprofile);


  useEffect(() => {
    if (userProfile) {
      console.log("user profile: ", userProfile)
    }
  }, [])


  useEffect(() => {
      console.log("get profile")
      dispatch(getUserProfile(session?.user.id))
  }, [])

  useEffect(() => {
    if (profileError) {
      toast.error(profileError)
    }
  }, [profileError])

  return (
    <div className='relative w-full h-20 md:h-24 flex flex-row p-2 z-0'>

      <div className='h-full aspect-square mr-auto'>

        {device !== 'Desktop' &&
          <button onClick={showNav} className='relative w-12 h-12 mx-auto my-auto text-center align-middle items-center rounded-lg hover:border-2 border-primary cursor-pointer'>
            <MenuIcon />
          </button>
        }
        {/*
          <button className='w-10 h-10 p-2 cursor-pointer border border-gray-950 rounded-lg animate-bounce hover:animate-none'>
            <MoonIcon fontSize={24} />
          </button>
        */}
      </div>

      <div className='absolute h-12 right-3 text-center items-center align-middle flex flex-row'>
        
      </div>

      {/*<div className='w-full border-b-2 mt-auto border-gray-950'></div>*/}
    </div>
  )
}

export default Header