import React from 'react'

//////////////---Navigation imports---////////////////////
import { useNavigate } from 'react-router-dom'

/////////////---Screen imports---////////////////////
import NavigationDocs from '../Components/LandingPage/NavigationDocs'
import InstallTabs from '../Components/LandingPage/InstallTabs'
import SnippetTabs from '../Components/LandingPage/SnippetTabs'
import ReactCodeSnippet from '../Components/LandingPage/ReactCodeSnippet'
import NextCodeSnippet from '../Components/LandingPage/NextCodeSnippet'
import Footer from '../Components/LandingPage/Footer'

//////////////---Device imports---////////////////////
import useDeviceDetection from '../Hooks/useDeviceDetection'



const DocsPage = () => {

    const navigate = useNavigate()

    const goHome = () => {
        navigate('/')
    }

    const gotoSignin = () => {
        navigate('/signin')
    }

    const goToSignup = () => {
        navigate('/signup')
    }

    return (
        <div className='w-screen h-screen flex flex-col bg-background p-3 overscroll-none'>
            <NavigationDocs
                goHome={goHome}
                goToSignin={gotoSignin}
                goToSignup={goToSignup}
            />
            <div className='w-full md:w-10/12 mx-auto'>

                <div className='w-full md:w-4/5 lg:w-3/4'>

                    <div className='py-4'>

                        <div className="mt-8 flex flex-col">

                            <h2 className="mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                                Getting started
                            </h2>

                            <p className="mt-16 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                                React Notified is a lightweight SDK that lets you display real-time, route-specific messages inside React and Next.js apps. Messages are managed centrally from your dashboard and delivered instantly.
                            </p>

                            <p className="mt-16 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                                Sign in to the dashboard, create a project and copy the project key. Paste project key into the component in your code and you good to go!!!
                            </p>
                        </div>

                    </div>

                    <div className='py-4 mt-8 w-full'>
                        <InstallTabs />
                    </div>

                    <p className="mt-16 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">1. Import and Wrap Your App like the examples below. </p>

                    <div className='pt-4 pb-8 md:pb-16 mt-6 w-full'>
                        <SnippetTabs />
                    </div>

                    <p className="mt-4 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                        2. Sign in to the dashboard, create a project and copy the project key.
                    </p>

                    <p className="mt-4 mb-16 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                       3. Paste project key into the component in your code and you good to go!!!
                    </p>

                </div>

                <div className='hidden md:block md:w-1/5 lg:w-1/4'></div>


            </div>

            <Footer />
        </div>
    )
}

export default DocsPage