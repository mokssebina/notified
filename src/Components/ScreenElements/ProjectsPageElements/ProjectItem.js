import React from 'react'

//////////////---Headless UI imports---////////////////////
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import clsx from 'clsx'

//////////////---MUI imports---////////////////////
import { Tooltip } from '@mui/material'

//////////////---Icon imports---////////////////////
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { PencilSquareIcon, TrashIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'




const ProjectItem = ({ projectName, projectKey, description, editProject, deleteProject, number, copyText }) => {
    return (
        <Disclosure as="div" className='w-full rounded-lg mb-2 border border-primary'>

            {({ open }) => (
                <>
                    <div className="w-full py-2 px-2 lg:px-4">
                        <div className='w-full h-12 flex flex-row'>
                            <div className='w-1/2 h-full flex flex-row items-center'>
                                <Tooltip title='Edit the project description'>
                                    <PencilSquareIcon onClick={editProject} className={clsx('w-5 text-foreground cursor-pointer')} />
                                </Tooltip>
                                <p className='text-sm md:text-base text-foreground text-left ml-6'>{`Product Name:  ${projectName}`}</p>
                            </div>
                            <div className='w-1/2 h-full items-center flex flex-row'>
                                <div className='h-full ml-auto flex flex-row items-center'>
                                    <p className='hidden md:block text-foreground text-base text-right mr-3'>{`Project Key:  ${projectKey}`}</p>
                                    <Tooltip title='Copy the project key' className='hidden md:block '>
                                        <ClipboardDocumentIcon onClick={copyText} className={clsx('hidden md:block w-5 text-foreground cursor-pointer')} />
                                    </Tooltip>
                                    <Tooltip title='Delete the project!' className='ml-5'>
                                        <TrashIcon onClick={deleteProject} className={clsx('w-5 text-foreground cursor-pointer')} />
                                    </Tooltip>
                                </div>
                                <DisclosureButton className={'w-12 h-12 ml-12'}>
                                    <ChevronRightIcon className={clsx('w-5 mx-auto text-foreground', open && 'rotate-90')} />
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>
                    <DisclosurePanel className="text-foreground">
                        <div className='w-full h-auto py-2 px-2 lg:px-4 flex flex-col'>
                            {number > 0 &&
                                <div className='w-full py-2 flex flex-col md:flex-row'>
                                    <p className='text-sm md:text-base font-semibold text-left'>{number == 1 ? `${number} Message`: `${number} Messages`}</p>
                                </div>
                            }
                            <div className='w-full h-16 flex flex-col md:flex-row'>
                                <p className='text-xs md:text-sm text-left'>{`Description: ${description}`}</p>
                            </div>
                        </div>
                    </DisclosurePanel>
                </>
            )}

        </Disclosure>
    )
}

export default ProjectItem