import React, { useState, useEffect } from 'react'

//////////////---Animation imports---////////////////////
import { AnimatePresence, motion } from "framer-motion";

//////////////---Navigation imports---////////////////////
import { useNavigate } from 'react-router-dom'

//////////////---Icon imports---////////////////////
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import CloseIcon from '@mui/icons-material/Close';

//////////////---Screen imports---////////////////////
import NavButton from './NavButton'

//////////////---Routes imports---////////////////////
import { navRoutes } from './appRoutes'

//////////////---Context imports---////////////////////
import { useAuth } from '../../Context/AuthContext'

//////////////---Image imports---////////////////////
import logoImage from '../../Assets/images/notified-02.png'


const MobileSidebar = ({ closeSideNav }) => {

    const navigate = useNavigate()
    const { signOut } = useAuth()
    /*
    const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 1024);
    };

    // Set up event listener when component mounts
    useEffect(() => {
        // Check screen size initially
        checkScreenSize();

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize);

        // Clean up event listener when component unmounts
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, [isMobile]);

    // If mobile, don't render the side navigation
    if (isMobile) {
        setShowNav(false)
    } else {
        setShowNav(true)
    }
    */

    return (
        <AnimatePresence>
            <motion.div
                key="panel"
                initial={{ x: "-100%" }}  // Start off-screen (hidden)
                animate={{ x: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }}    // Slide in
                exit={{ x: "-100%", transition: { duration: 1.5, ease: "easeInOut" } }}      // Slide out
                transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
                //initial={{ x: "100%" }}
                //animate={{ x: openPay ? "0%" : "100%" }}
                //transition={{ type: "spring", stiffness: 80 }}
                className={`absolute w-11/12 md:w-1/3 h-full p-5 z-50`}
            >
                <div className='w-full h-full rounded-lg p-2 bg-slate-950 border-2 flex flex-col space-y-1'>

                    <div className='relative top-0 w-full h-16 flex flex-row mb-8'>

                        <div onClick={() => navigate('/projects')} className='w-2/4 h-16 pt-4 mx-auto mb-9 cursor-pointer'>
                            <img className='w-full aspect-auto' alt='logo-image' src={logoImage} />
                        </div>

                        <button onClick={closeSideNav} className='h-10 w-10 ml-auto aspect-auto text-white'>
                            <CloseIcon />
                        </button>

                    </div>

                    <div className='relative w-full h-content'>
                        {navRoutes.map((item) => (
                            <NavButton key={item.id} path={item.path} icon={item.icon} title={item.title} />
                        ))}
                    </div>

                    <button onClick={signOut} className='relative w-full h-12 px-10 py-3 rounded-lg cursor-pointer text-white hover:bg-slate-950'>
                        <div className='w-full h-full flex flex-row space-x-4'>
                            <ArrowRightStartOnRectangleIcon />
                            <p>Logout</p>
                        </div>
                    </button>

                </div>

            </motion.div>
        </AnimatePresence>
    )
}

export default MobileSidebar