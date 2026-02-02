import React from 'react'

const Pricing = () => {

    const priceCards = [
        {
            title: "Hobbyist",
            description: "Indie devs trying the SDK, hobby projects, open source tools.",
            price: '$0',
            features: '20 credits'
        },
        {
            title: "Starter",
            description: "Freelancers, indie SaaS founders, early-stage projects.",
            price: '$9',
            features: '50 credits'
        },
        {
            title: "Growth",
            description: "Startups with multiple apps or growing user base.",
            price: '$29',
            features: '200 credits'
        }
        /*
        {
            title: "Enterprise",
            description: "SaaS teams with production-critical apps",
            price: '$99',
            features: '1000 credits'
        }
        */
    ];

    return (
        <section className="py-8 bg-background flex flex-col space-y-4" id="pricing">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-2 md:mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Start for free and pay as you grow. No surprise fees or hidden costs.
                </p>
            </div>
            {/* Main Features Grid */}
            <div className="relative w-full lg:w-3/5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {priceCards?.map((item, index) => (
                    <div key={index} className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant cursor-pointer group pb-6">
                        <div className="p-6 space-y-4">
                            <div className="space-y-6 flex flex-col">
                                <h2 className="text-lg font-semibold text-foreground text-center">
                                    {item.title}
                                </h2>
                                <h1 className="text-2xl md:text-3xl my-4 font-semibold text-primary text-center">
                                    {item.price}
                                </h1>
                                <div className='w-5/6 mx-auto flex flex-col space-y-3'>
                                    <p className="text-muted-foreground">
                                        {item.description}
                                    </p>
                                    <p className="text-muted-foreground font-semibold mt-3">
                                        {item.features}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/*----------------------*/}
        </section>
    )
}

export default Pricing