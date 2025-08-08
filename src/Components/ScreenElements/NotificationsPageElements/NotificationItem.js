import React from 'react'

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export const NotificationItem = ({ title, editMessage, deleteMessage }) => {
    return (
        <div className='relative w-full h-12 mb-1 flex flex-row cursor-pointer rounded-lg border border-gray-950'>

            <div className='relative w-3/5 h-full p-3'>
                <p className='text-base font-semibold'>{title}</p>
            </div>

            <div className='h-12 py-[2px] flex flex-row ml-auto'>

                <button onClick={editMessage} className='relative w-11 h-11 p-1'>
                    <div className='w-full h-full p-[6px] rounded-md hover:border-[1.5px] border-slate-950'>
                        <PencilSquareIcon className='size-6' />
                    </div>
                </button>

                <button onClick={deleteMessage} className='relative w-11 h-11 p-1'>
                    <div className='w-full h-full p-[6px] rounded-md hover:border-[1.5px] border-slate-950'>
                        <TrashIcon className='size-6' />
                    </div>
                </button>

            </div>

        </div>
    )
}
