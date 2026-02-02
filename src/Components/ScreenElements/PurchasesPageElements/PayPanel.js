import React from 'react'

//////////////---Animation imports---////////////////////
import { AnimatePresence, motion } from "framer-motion";

//////////////---Icon imports---////////////////////
import { Close } from '@mui/icons-material';

//////////////---Headless imports---////////////////////
import { Transition } from "@headlessui/react";

//////////////---Screen imports---////////////////////
import PayCard from './PayCard';

//////////////---Data imports---////////////////////
import { cardBundles } from './bundles';



const PayPanel = ({ close, openPay, quantity }) => {
    return (
        <AnimatePresence>
            <motion.div
                key="panel"
                initial={{ x: "100%" }}  // Start off-screen (hidden)
                animate={{ x: 0 }}    // Slide in
                exit={{ x: "100%", transition: { duration: 1.5, ease: "easeInOut" } }}      // Slide out
                transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
                //initial={{ x: "100%" }}
                //animate={{ x: openPay ? "0%" : "100%" }}
                //transition={{ type: "spring", stiffness: 80 }}
                className='absolute w-11/12 md:w-1/3 h-screen top-0 right-0 bg-background ml-auto z-50'
            >
                <div className='w-full h-full flex flex-col text-white'>

                    <div className='w-full h-16 py-3 flex flex-row px-3'>
                        <h1 className='font-semibold mt-2'>Buy Tokens</h1>
                        <button onClick={close} className='w-10 h-10 ml-auto'>
                            <Close />
                        </button>
                    </div>

                    <div style={{ height: 'calc(100% - 4rem)' }} className='relative w-full pt-10 px-3 pb-4 overflow-y-auto'>

                        {cardBundles?.map((item) => (
                            <PayCard
                                key={item.id}
                                type={item.type}
                                buypackage={item.buypackage}
                                features={item.features}
                                price={item.price}
                                button={item.button}
                                id={item.id}
                                quantity={item.quantity}
                                credits={item.credits}
                            />
                        ))}

                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default PayPanel