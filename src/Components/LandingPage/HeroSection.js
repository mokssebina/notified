import ToggleDemo from "./ToggleDemo";

const HeroSection = ({messageType, handleMessageType, messageTitle, handleTitle, position, handlePosition, content, handleContent, goToSignup, isEnabled, setIsEnabled}) => {
    return (
        <section className="relative min-h-screen flex items-center bg-gradient-subtle overflow-hidden pt-8 sm:pt-0">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-10"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Content */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center space-x-2 bg-card/50 border border-border/50 rounded-full px-4 py-2 backdrop-blur-sm mt-6">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                            <span className="text-sm text-muted-foreground">Real-time Status Communication</span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-4">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                                Route-Specific Status
                                <br />
                                <span className="text-transparent bg-gradient-primary bg-clip-text">
                                    Messages in Real-Time
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                                Plug-and-play SDK for React & Next.js. Show contextual messages scoped to exact routes—no backend required. Just add a few lines of code and start communicating instantly.
                            </p>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={goToSignup} className="h-12 rounded-lg bg-primary py-2 px-4 justify-center text-sm mt-14 text-white data-[hover]:bg-gray-800">
                                {'Get Started'}
                            </button>
                        </div>

                        {/* Stats 
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-border/30">
                            <div className="space-y-1 text-center sm:text-left">
                                <div className="text-xl sm:text-2xl font-bold text-foreground">99.9%</div>
                                <div className="text-sm text-muted-foreground">Uptime</div>
                            </div>
                            <div className="space-y-1 text-center sm:text-left">
                                <div className="text-xl sm:text-2xl font-bold text-foreground">&lt;50ms</div>
                                <div className="text-sm text-muted-foreground">Latency</div>
                            </div>
                            <div className="space-y-1 text-center sm:text-left">
                                <div className="text-xl sm:text-2xl font-bold text-foreground">24/7</div>
                                <div className="text-sm text-muted-foreground">Monitoring</div>
                            </div>
                        </div>
                        */}
                    </div>

                    {/* Right Column - Interactive Toggle Demo */}
                    <div 
                    className="relative flex items-center justify-center bg-gradient-radial from-primary/40 via-primary/0 to-primary/0"
                    >
                        <ToggleDemo 
                            messageType={messageType} 
                            handleMessageType={handleMessageType} 
                            messageTitle={messageTitle} 
                            handleTitle={handleTitle} 
                            position={position} 
                            handlePosition={handlePosition} 
                            content={content} 
                            handleContent={handleContent}
                            isEnabled={isEnabled} 
                            setIsEnabled={setIsEnabled}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;