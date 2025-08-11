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

                <header className='w-full'>

                    <div className='w-full xl:w-4/5 mx-auto flex flex-row'>

                        <div className='w-1/2 md:w-1/3'>
                            <div className='w-28 h-14 md:w-52 md:h-20'>
                                <img className='w-full aspect-auto' alt='logo-image' src={logoImage} />
                            </div>
                        </div>

                        <div className='relative hidden w-1/3 h-20 mx-auto md:block bg-slate-300 z-10'></div>

                        <div className='w-1/2 md:w-1/3 flex flex-col'>
                            <button onClick={() => { }} className='h-12 py-3 px-3 rounded-lg ml-auto bg-slate-950 text-white align-middle'>
                                {'Sign in'}
                            </button>
                        </div>

                    </div>

                </header>

                <div className='w-full flex flex-col'>

                    <div className='w-full xl:w-4/5 mx-auto flex flex-row py-8'>

                        <div className='w-full md:w-3/5'>

                            <h1 className='font-bold text-2xl md:text-4xl mb-6 text-wrap'>
                                Deliver real-time, route-specific messages to your users — with zero redeploys.
                            </h1>

                        </div>

                    </div>

                    <div className='w-full xl:w-4/5 mx-auto h-full flex flex-col xl:flex-row'>

                        <div className='w-full xl:w-1/2'>

                            <div className='relative w-4/5 p-4 flex flex-col items-center align-middle'>

                                <h3 className='text-lg md:text-2xl'>
                                    A plug-and-play SDK that lets you show targeted, in-app messages based on your app’s current route.
                                </h3>

                                <h3 className='text-lg md:text-2xl'>
                                    Engage your users with dynamic messages that update instantly — built for React & Next.js developers.
                                </h3>

                            </div>

                            <div className='p-4 mt-auto'>
                                <button onClick={() => { }} className='h-12 px-3 rounded-lg ml-auto bg-slate-950 text-white align-middle'>
                                    {'Get Started'}
                                </button>
                            </div>

                        </div>

                        <div className='w-full xl:w-1/2'>

                            <div className='w-4/5 h-auto mx-auto'>

                                <Editor
                                    messageType={messageType} handleMessageType={handleMessageType} position={position} handlePosition={handlePosition} route={route} handleRoute={handleRoute} messageTitle={messageTitle}
                                    handleTitle content={content} handleContent={handleContent} backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor} textColor={textColor} setTextColor={setTextColor}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <section id="features" class="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

                <div class="bg-gray-800 rounded-lg p-8 shadow-lg flex flex-col items-center">
                    <svg class="w-16 h-16 mx-auto mb-6 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" >
                        <path d="M17 1l4 4-4 4" />
                        <path d="M3 11v-1a4 4 0 0 1 4-4h12" />
                        <path d="M7 19l-4 4 4 4" />
                        <path d="M21 13v1a4 4 0 0 1-4 4H5" />
                    </svg>
                    <h4 class="text-xl font-semibold mb-3">Real-Time Messaging</h4>
                    <p class="text-gray-400 mb-6">
                        Show your users targeted notifications that update live across devices and routes — no page reload needed.
                    </p>
                    <img
                        src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=400&q=80"
                        alt="Real-Time Messaging illustration"
                        class="rounded-md shadow-md max-h-48 object-cover"
                        loading="lazy"
                    />
                </div>

                <div class="bg-gray-800 rounded-lg p-8 shadow-lg flex flex-col items-center">
                    <svg class="w-16 h-16 mx-auto mb-6 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                    </svg>
                    <h4 class="text-xl font-semibold mb-3">Backend-Less Integration</h4>
                    <p class="text-gray-400 mb-6">
                        Forget managing complex infrastructure. Our SDK leverages Supabase and edge functions so you focus on building, not backend ops.
                    </p>
                    <img
                        src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80"
                        alt="Backend-Less Integration illustration"
                        class="rounded-md shadow-md max-h-48 object-cover"
                        loading="lazy"
                    />
                </div>

                <div class="bg-gray-800 rounded-lg p-8 shadow-lg flex flex-col items-center">
                    <svg class="w-16 h-16 mx-auto mb-6 text-indigo-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" >
                        <path d="M3 7v6a4 4 0 0 0 4 4h10" />
                        <path d="M21 7v6a4 4 0 0 1-4 4H7" />
                    </svg>
                    <h4 class="text-xl font-semibold mb-3">Precise Route Targeting</h4>
                    <p class="text-gray-400 mb-6">
                        Display messages only on relevant pages or URL patterns — maximize impact, minimize noise.
                    </p>
                    <img
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
                        alt="Precise Route Targeting illustration"
                        class="rounded-md shadow-md max-h-48 object-cover"
                        loading="lazy"
                    />
                </div>
            </section>

        </div>
    )
}

export default LandingPage