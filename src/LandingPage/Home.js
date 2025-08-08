import React, { useState } from 'react'

//////////////---Navigation imports---////////////////////
import { useNavigate } from 'react-router-dom'

/////////////---Screen imports---////////////////////
import Editor from './Editor'

//////////////---Image imports---////////////////////
import logoImage from '../Assets/images/notified-01.png'


const LandingPage = () => {

    const [messageType, setMessageType] = useState("")
    const [position, setPosition] = useState("")
    const [route, setRoute] = useState("")
    const [messageTitle, setMessageTitle] = useState("")
    const [content, setContent] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("#ffffff")
    const [textColor, setTextColor] = useState("#000000")

    const handleMessageType = (event) => {
        setMessageType(event.target.value)
    }

    const handlePosition = (event) => {
        setPosition(event.target.value)
    }

    const handleRoute = (event) => {
        setRoute(event.target.value)
    }

    const handleContent = (event) => {
        setContent(event.target.value)
    }


    return (
        <div className='w-screen h-screen flex flex-col bg-[#fff7ed] p-3 overflow-scroll'>

            <div className='w-full xl:h-full'>

                {/*-----------------Header component----------------*/}

                <div className='w-full flex flex-row'>

                    <div className='w-1/2 md:w-1/3'>
                        <div className='w-28 h-14 md:w-52 md:h-20'>
                            <img className='w-full aspect-auto' alt='logo-image' src={logoImage} />
                        </div>
                    </div>

                    <div className='relative hidden w-1/3 h-20 mx-auto md:block bg-slate-300 z-10'></div>

                    <div className='w-1/2 md:w-1/3 flex flex-col'>
                        <button onClick={() => { }} className='h-12 py-3 px-3 rounded-lg ml-auto bg-slate-950 text-white align-middle'>
                            {'Get Started'}
                        </button>
                    </div>

                </div>

                {/*-----------------Body component----------------*/}

                <div className='w-full flex flex-col xl:flex xl:flex-row'>

                    <div className='w-full h-full xl:w-1/2 flex flex-col'>

                        <div className='relative w-4/5 flex flex-col items-center align-middle'>

                            <h1 className='font-bold text-5xl mb-6 text-wrap'>
                                Deliver real-time, route-specific messages to your users — with zero redeploys.
                            </h1>

                            <h3 className='text-2xl text-wrap text-justify'>
                                A plug-and-play SDK that lets you show targeted, in-app messages based on your app’s current route — powered by Supabase and managed from a central dashboard.
                            </h3>

                        </div>

                    </div>

                    <div className='w-full h-full xl:w-1/2 pt-12'>

                        {/*<div className='w-4/5 aspect-video rounded-lg mt-4 mx-auto border-2 border-gray-950 bg-slate-50'>

                        </div>*/}

                        <div className='w-4/5 h-auto mx-auto mt-20'>

                            <Editor
                                messageType={messageType} handleMessageType={handleMessageType} position={position} handlePosition={handlePosition} route={route} handleRoute={handleRoute} messageTitle={messageTitle}
                                handleTitle content={content} handleContent={handleContent} backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor} textColor={textColor} setTextColor={setTextColor}
                            />

                        </div>

                    </div>

                </div>

            </div>

            <div className='w-full h-full'></div>

        </div>
    )
}

export default LandingPage