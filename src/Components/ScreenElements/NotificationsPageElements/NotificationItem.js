import React from 'react'

//////////////---Headless UI imports---////////////////////
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

//////////////---MUI imports---////////////////////
import { Tooltip } from '@mui/material'

//////////////---Icon imports---////////////////////
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { PencilSquareIcon, TrashIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'



const NotificationItem = ({ title, projectKey, enabled, position, content, route, type, editMessage, deleteMessage }) => {
    return (
        <Disclosure as="div" className='w-full rounded-lg mb-2 border border-primary'>

            {({ open }) => (
                <>
                    <div className="w-full py-2 px-2 lg:px-4">
                        <div className='w-full h-12 flex flex-row'>
                            <div className='w-1/2 h-full flex flex-row items-center'>
                                <Tooltip title='Edit the project description'>
                                    <PencilSquareIcon onClick={editMessage} className={clsx('w-5 text-foreground cursor-pointer')} />
                                </Tooltip>
                                <p className='text-sm md:text-base text-foreground text-left ml-6'>{`Title:  ${title}`}</p>
                            </div>
                            <div className='w-1/2 h-full items-center flex flex-row'>
                                <div className='h-full ml-auto flex flex-row items-center'>
                                    <p className='hidden md:block text-base text-foreground text-right mr-3'>{`Project Key:  ${projectKey}`}</p>
                                    <Tooltip title='Delete the project!' className='ml-5'>
                                        <TrashIcon onClick={deleteMessage} className={clsx('w-5 text-foreground cursor-pointer')} />
                                    </Tooltip>
                                </div>
                                <DisclosureButton className={'w-12 h-12 ml-12'}>
                                    <ChevronRightIcon className={clsx('w-5 text-foreground mx-auto', open && 'rotate-90')} />
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>
                    <DisclosurePanel className="text-foreground">
                        <div className='w-full h-auto py-2 px-2 lg:px-4 flex flex-col'>

                            <div className='w-full py-1 flex md:flex-row'>
                                <div className='w-1/2'>
                                    <p className='text-xs md:text-sm text-foreground font-semibold'>{`Status: ${enabled ? 'Enabled' : 'Disabled'}`}</p>
                                </div>
                                <div className='w-1/2'>
                                    <p className='text-xs md:text-sm text-foreground font-semibold'>{`Position: ${position}`}</p>
                                </div>
                            </div>

                            <div className='w-full py-1 flex md:flex-row'>
                                <div className='w-1/2'>
                                    <p className='text-xs md:text-sm text-foreground font-semibold'>{`Route: ${route}`}</p>
                                </div>
                                <div className='w-1/2'>
                                    <p className='text-xs md:text-sm text-foreground font-semibold'>{`Type: ${type}`}</p>
                                </div>
                            </div>

                            <div className='w-full h-16 py-1 flex flex-col md:flex-row'>
                                <p className='text-xs md:text-sm text-foreground text-left'>{`Message: ${content}`}</p>
                            </div>
                        </div>
                    </DisclosurePanel>
                </>
            )}

        </Disclosure>
    )
}

export default NotificationItem