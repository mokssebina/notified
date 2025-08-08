import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import LandingPage from '../LandingPage/Home'
import Home from '../Pages/Home'
import Notifications from '../Pages/Notifications'
import Subscription from '../Pages/Subscription'
import Account from '../Pages/Account'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import Signin from '../AuthPages/Signin'
import { useAuth } from '../Context/AuthContext'
import Signup from '../AuthPages/Signup'


const AppRoutes = () => {

  const { user, session } = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      navigate(0); // Stay on the current page
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  /*session?.user*/

  return (
    <Routes>

      {/*------------------Public Routes------------------*/}
      <Route path={'/'} element={<PublicRoutes authUser={session?.user} />}>

        <Route index path={'/'} element={<Navigate to='/signin' />} />
        <Route path={'/signin'} element={<Signin />} />
        <Route path={'/signup'} element={<Signup />} />

      </Route>
      
      {/*------------------Private Routes------------------*/}
      <Route path={'/'} element={<PrivateRoutes authUser={session?.user} />}>

        <Route index path={'/'} element={<Navigate to='/projects' />} />
        <Route path={'/projects'} element={<Home />} />
        <Route path={'/notifications'} element={<Notifications />} />
        <Route path={'/subscriptions'} element={<Subscription />} />
        <Route path={'/account'} element={<Account />} />

      </Route>

    </Routes>
  )
}

export default AppRoutes