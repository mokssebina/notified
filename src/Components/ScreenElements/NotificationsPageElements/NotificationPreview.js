import React from 'react'
import { InformationCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';



const NotificationPreview = ({ label, textColor, backgroundColor, type, title, content }) => {
    return (
        <>
            <p className='text-gray-950 text-sm/6 mb-3'>{label}</p>

            <div className='w-full p-3 bg-slate-300 border border-gray-900 rounded-lg'>

                <div style={{ borderColor: `${textColor}`, backgroundColor: `${backgroundColor}` }} className={`w-full md:w-[400px] mx-auto flex flex-col border-2 rounded-lg py-2 px-3`}>

                    <div className='w-full flex flex-row'>

                        {type === 'Information' && <p className='text-lg' style={{ fontSize: '1.125rem' }}>ℹ</p>}
                        {type === 'Warning' && <p className='text-lg' style={{ fontSize: '1.125rem' }}>⚠️</p>}
                        {type === 'Error' && <p className='text-lg' style={{ fontSize: '1.125rem' }}>‼️</p>}
                        <p style={{ color: `${textColor}` }} className={`text-base font-semibold ml-3`}>{title}</p>
                    </div>

                    <div className='w-full py-2 h-auto'>
                        <p style={{ color: `${textColor}` }} className={`text-sm`}>{content}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default NotificationPreview