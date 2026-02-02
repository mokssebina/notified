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
import { CircleStackIcon } from '@heroicons/react/24/outline';

//////////////---API imports---////////////////////
import { getUserProfile } from '../../Pages/Slices/GetUserProfile';

//////////////---Data imports---////////////////////



const Header = ({ showNav, device }) => {

  const { session } = useAuth()
  const dispatch = useDispatch()
  const { userProfile, profileLoading, profileError } = useSelector((state) => state.getuserprofile);
  const { updateCreditsData, updateCreditsLoader, updateCreditsErrorMessage } = useSelector((state) => state.updateprofilecredits);

  useEffect(() => {
    console.log("user profile: ", userProfile)
  }, [])

  useEffect(() => {
    if (profileError) {
      toast.error(profileError)
    }
  }, [profileError])

  useEffect(() => {
    if (updateCreditsErrorMessage) {
      toast.error(updateCreditsErrorMessage)
    }
  }, [updateCreditsErrorMessage])

  return (
    <div className='relative w-full lg:w-10/12 mx-auto h-20 md:h-24 flex flex-row py-2 z-0'>

      <div className='h-full aspect-square mr-auto'>

        {device !== 'Desktop' &&
          <button onClick={showNav} className='relative w-12 h-12 mx-auto my-auto text-foreground text-center align-middle items-center rounded-lg hover:border-2 border-primary cursor-pointer'>
            <MenuIcon />
          </button>
        }
        {/*
          <button className='w-10 h-10 p-2 cursor-pointer border border-gray-950 rounded-lg animate-bounce hover:animate-none'>
            <MoonIcon fontSize={24} />
          </button>
        */}
      </div>

      <div className='relative ml-auto h-12 text-white text-center items-center align-middle flex flex-row space-x-2'>

        {profileLoading &&
          <div className='w-20 h-5 flex flex-row'>
            <div className='w-2/3 h-full rounded bg-gray-400 animate-pulse'></div>
            <div className='w-5 h-full rounded ml-auto bg-gray-400 animate-pulse'></div>
          </div>
        }

        {(!profileLoading && userProfile) &&
          <>
            <p className='text-sm'>{`${userProfile?.credits} credits`}</p>
            <CircleStackIcon className='size-5' />
          </>
        }

      </div>

      {/*<div className='w-full border-b-2 mt-auto border-gray-950'></div>*/}
    </div>
  )
}

export default Header