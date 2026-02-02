import React, { useState } from 'react'

//////////////---Navigation imports---////////////////////
import { useNavigate } from 'react-router-dom'

/////////////---Screen imports---////////////////////
import Editor from './Editor'
import Navigation from '../Components/LandingPage/Navigation'
import HeroSection from '../Components/LandingPage/HeroSection'
import FeaturesSection from '../Components/LandingPage/FeatureSection'
import CtaSection from '../Components/LandingPage/CtaSection'
import Footer from '../Components/LandingPage/Footer'
import FadeWrapper from '../Components/LandingPage/FadeWrapper'
import Notification from '../Components/LandingPage/Notification'
import Pricing from '../Components/LandingPage/Pricing'

///////////////////---Device imports---////////////////////
import useDeviceDetection from '../Hooks/useDeviceDetection'



const LandingPage = () => {

    const navigate = useNavigate()
    const device = useDeviceDetection()

    const [messageType, setMessageType] = useState("Error")
    const [position, setPosition] = useState("bottom")
    const [route, setRoute] = useState("")
    const [messageTitle, setMessageTitle] = useState("Error")
    const [content, setContent] = useState("You need to think of a better message.")
    const [backgroundColor, setBackgroundColor] = useState("#21252b")
    const [textColor, setTextColor] = useState("#fafafa")
    const [borderColor, setBorderColor] = useState("#f97015")
    const [visible, setVisible] = useState(false)

    const handleMessageType = (event) => {
        setMessageType(event.target.value)
    }

    const handlePosition = (event) => {
        setPosition(event.target.value)
    }

    const handleTitle = (event) => {
        setMessageTitle(event.target.value)
    }

    const handleContent = (event) => {
        setContent(event.target.value)
    }

    const goHome = () => {
        navigate('/')
    }

    const gotoSignin = () => {
        navigate('/signin')
    }

    const goToSignup = () => {
        navigate('/signup')
    }

    const goToFeatures = () => {
        navigate('/#features')
    }

    const goToPricing = () => {
        navigate('/#pricing')
    }

    const goToDocs = () => {
        navigate('/docs')
    }


    return (
        <>
            <div className='w-screen h-full md:h-screen flex flex-col bg-background p-3 overscroll-none'>

                <Navigation
                    goHome={goHome}
                    goToSignin={gotoSignin}
                    goToSignup={goToSignup}
                    //goToFeatures={goToFeatures} 
                    //goToPricing={goToPricing}
                    goToDocs={goToDocs}
                />
                <HeroSection
                    messageType={messageType}
                    handleMessageType={handleMessageType}
                    messageTitle={messageTitle}
                    handleTitle={handleTitle}
                    position={position}
                    handlePosition={handlePosition}
                    content={content}
                    handleContent={handleContent}
                    goToSignup={goToSignup}
                    isEnabled={visible}
                    setIsEnabled={() => setVisible(!visible)}
                    backgroundColor={backgroundColor}
                    setBackgroundColor={setBackgroundColor}
                    borderColor={borderColor}
                    setBorderColor={setBorderColor}
                    textColor={textColor}
                    setTextColor={setTextColor}
                />
                <FeaturesSection />
                <Pricing />
                <CtaSection goToSignup={goToSignup} />
                <Footer />

            </div>

            {visible &&
                <FadeWrapper visible={visible} device={device} position={position}>
                    <Notification
                        messageType={messageType}
                        messageTitle={messageTitle}
                        content={content}
                        backgroundColor={backgroundColor}
                        borderColor={borderColor}
                        textColor={textColor}
                    />
                </FadeWrapper>
            }
        </>
    )
}

export default LandingPage