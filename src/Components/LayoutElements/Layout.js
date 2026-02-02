import React, { useState, useEffect, useContext, Fragment } from 'react'

//////////////---Navigation imports---////////////////////
import { useLocation } from 'react-router-dom';

//////////////---Animation imports---////////////////////
import { motion, AnimatePresence } from "framer-motion";

//////////////---Screen imports---////////////////////
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import PayPanel from '../ScreenElements/PurchasesPageElements/PayPanel';

//////////////---Redux imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Context imports---////////////////////
import { useAuth } from '../../Context/AuthContext';

//////////////---Hook imports---////////////////////
import useDeviceDetection from '../../Hooks/useDeviceDetection';

//////////////---API imports---////////////////////
import { getUserProfile } from '../../Pages/Slices/GetUserProfile';


const Layout = ({ children }) => {

    const location = useLocation()
    const dispatch = useDispatch()

    const { showNav, setShowNav, device, preview, togglePreview, panel, setPanel, session } = useAuth()


    const { userProfile, profileLoading, profileError } = useSelector((state) => state.getuserprofile);


    const [isMobile, setIsMobile] = useState(false);

    //const deviceType = useDeviceDetection()

    useEffect(() => {

        if (device) {
            console.log("current device: ", device)
        } else {
            console.log("none")
        }

    }, [])

    const panelVariants = {
        closed: {
            x: '100%',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            x: '0%',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 30
            }
        }
    };

    // Overlay animation variants
    const overlayVariants = {
        closed: {
            opacity: 0,
            transition: {
                delay: 0.2
            }
        },
        open: {
            opacity: 1
        }
    };

    const openSideNav = () => {
        console.log("open side nav")
        setShowNav(true)
    }


    return (

        <div className={`w-screen h-screen ${device === 'Desktop' && 'flex flex-row'} bg-background overscroll-hidden`}>

            {panel &&
                <>
                    <PayPanel openPay={panel} close={() => setPanel(!panel)} />
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={overlayVariants}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
                    />
                </>
            }

            <>
                {(showNav && device !== 'Desktop') &&

                    <>
                        <MobileSidebar showNav={showNav} closeSideNav={() => setShowNav(false)} />
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={overlayVariants}
                            className="fixed inset-0 bg-background bg-opacity-50 z-40"
                        />
                    </>
                }
            </>

            {device === 'Desktop' && <Sidebar device={device} />}

            <main className={`${preview ? 'w-full' : 'xl:w-4/5'} h-full`}>

                {!preview && <Header showNav={() => setShowNav(true)} device={device} />}

                <div className={`${preview ? 'w-full h-full' : 'w-full h-content px-2 pb-1 overflow-hidden'}`}>{children}</div>

                {/*preview &&
                    <button onClick={() => togglePreview()} type='submit' className="fixed right-8 bottom-8 w-32 h-12 rounded shadow-md border border-white bg-gray-950 py-2 px-4 text-sm mt-14 z-10 text-white data-[hover]:bg-gray-800">
                        ← Back
                    </button>
                */}
            </main>

        </div>


    )
}

export default Layout