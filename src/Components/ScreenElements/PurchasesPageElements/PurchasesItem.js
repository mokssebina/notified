import React from 'react'

//////////////---Headless UI imports---////////////////////
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

//////////////---Icon imports---////////////////////
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'



const PurchaseItem = ({ productName, productPrice, priceId, transactionId, orderId, purchaseDate }) => {
    return (
        <Disclosure as="div" className='w-full rounded-md mb-1 border border-gray-900'>

            {({ open }) => (
                <>
                    <DisclosureButton className="w-full py-2 px-2">
                        <div className='w-full h-12 flex flex-row'>
                            <div className='w-1/2 h-full flex flex-row items-center'>
                                <p className='text-sm md:text-base text-left'>{`Product Name: ${productName}`}</p>
                            </div>
                            <div className='w-1/2 h-full items-center flex flex-row'>
                                <div className='h-full ml-auto flex flex-row items-center'>
                                    <p className='text-base text-right mr-3'>{`$ ${productPrice}`}</p>
                                    <ChevronRightIcon className={clsx('w-5', open && 'rotate-90')} />
                                </div>
                            </div>
                        </div>
                    </DisclosureButton>
                    <DisclosurePanel className="text-gray-500">
                        <div className='w-full h-28 p-2 flex flex-col'>
                            <div className='w-full h-12 flex flex-col md:flex-row'>
                                <div className='w-full md:w-1/2 h-full flex flex-row items-center'>
                                    <p className='text-xs md:text-base text-left'>{`Transaction ID: ${transactionId}`}</p>
                                </div>
                                <div className='w-full md:w-1/2 h-full flex flex-row items-center'>
                                    <p className='text-xs md:text-base text-left'>{`Order ID: ${orderId}`}</p>
                                </div>
                            </div>

                            <div className='w-full h-12 flex flex-col md:flex-row'>
                                <div className='w-full md:w-1/2 h-full flex flex-row items-center'>
                                    <p className='text-xs md:text-base text-left'>{`Price ID: ${priceId}`}</p>
                                </div>
                                <div className='w-full md:w-1/2 h-full flex flex-row items-center'>
                                    <p className='text-xs md:text-base text-left'>{`Purchased at: ${purchaseDate}`}</p>
                                </div>
                            </div>

                        </div>
                    </DisclosurePanel>
                </>
            )}

        </Disclosure>
    )
}

export default PurchaseItem