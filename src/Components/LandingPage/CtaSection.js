import { ArrowRight, CheckCircle } from "lucide-react";

const CtaSection = ({goToSignup}) => {
    const benefits = [
        "5-minute setup with zero configuration",
        "Cancel anytime, no long-term contracts"
    ];

    return (
        <section className="w-full py-24 bg-gradient-subtle relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-10"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Main CTA */}
                    <div className="space-y-6">
                        {/*
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                            Ready to add contextual
                            <br />
                            <span className="text-transparent bg-gradient-primary bg-clip-text">
                                status messages?
                            </span>
                        </h2>
                        */}
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Join developers using React notified to reduce support tickets and keep users informed
                            with route-specific, real-time status communication.
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
                        {/*benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start space-x-3 text-left">
                                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-sm sm:text-base text-muted-foreground">{benefit}</span>
                            </div>
                        ))*/}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <button onClick={goToSignup} className="w-full sm:w-80 h-12 mx-auto rounded-lg bg-primary py-2 px-4 text-sm mt-14 text-white data-[hover]:bg-gray-800">
                            {'Get Started →'}
                        </button>
                    </div>

                    {/* Trust indicators
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 md:space-x-8 pt-8 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span>14-day free trial</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span>Setup in minutes</span>
                        </div>
                    </div>
                    */}
                </div>
            </div>
        </section>
    );
};

export default CtaSection;