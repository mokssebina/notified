import React, { useState } from 'react'

//////////////---Headless ui imports---////////////////////
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

//////////////---Icon imports---////////////////////
import CloseIcon from '@mui/icons-material/Close';

//////////////---Material UI imports---///////////////
import { Skeleton, CircularProgress, Divider } from '@mui/material';



const DeleteModal = ({ confirm, closeConfirm, open, deleteProjectLoading, confirmationText }) => {
  return (
    <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={() => {}}>
            <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-md" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md flex flex-col rounded-lg p-6 border border-primary/30 shadow-lg shadow-primary/40 backdrop-blur-2xl bg-background duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <div className='w-full h-9 flex flex-col'>
                            <DialogTitle as="h3" className="text-base/7 font-medium text-foreground">
                                Confirmation
                            </DialogTitle>
                            <button type='button' disabled={deleteProjectLoading} onClick={closeConfirm} className='absolute w-10 h-6 p1 right-4 text-foreground'>
                                <CloseIcon />
                            </button>
                        </div>

                        <p className="mt-2 text-sm/6 text-foreground">
                            {confirmationText}
                        </p>
                        <div className="relative w-full mt-4">
                            <button
                                disabled={deleteProjectLoading}
                                className="relative w-1/2 h-14 mt-8 text-center ml-[25%] rounded bg-primary cursor-pointer text-foreground"
                                onClick={confirm}
                            >
                                {deleteProjectLoading ? <CircularProgress size={20} color='#ffffff' /> : 'Delete Message'}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
  )
}

export default DeleteModal