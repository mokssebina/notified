import React from 'react'

const Pricing = () => {

    const priceCards = [
        {
            title: "Hobbyist",
            description: "Suitable for teams looking to see of this solution works for them.",
            price: '$0',
            features: [
                "1 project",
                "Up to 5 messages",
            ]
        },
        {
            title: "Starter Pack",
            description: "Great for teams running a few projects concurrently.",
            price: '$8,99',
            features: [
                "3 project",
                "Up to 20 messages",
            ]
        }
    ];

    return (
        <section className="py-8 bg-background flex flex-col space-y-4" id="pricing">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Start for free and pay as you grow. No surprise fees or hidden costs.
                </p>
            </div>
            {/* Main Features Grid */}
            <div className="w-full md:w-1/2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                {priceCards?.map((item, index) => (
                    <div key={index} className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant cursor-pointer group">
                        <div className="p-6 space-y-4">
                            <div className="space-y-2 flex flex-col">
                                <h2 className="text-lg font-semibold text-foreground text-center">
                                    {item.title}
                                </h2>
                                <h1 className="text-3xl font-semibold text-primary text-center">
                                    {item.price}
                                </h1>
                                <div className='w-5/6 mx-auto flex flex-col space-y-3'>
                                    <p className="text-muted-foreground">
                                        {item.description}
                                    </p>
                                    <ul className='list-disc'>
                                        {item?.features.map((item, index) => (
                                            <li key={index} className='text-sm text-muted-foreground'>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Pricing