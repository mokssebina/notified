import React from 'react'

const NotSupported = () => {
  return (
    <div className='w-screen h-screen flex flex-row bg-white overscroll-none'>

        <div className='relative w-full md:w-[350px] lg:w-[500px] flex flex-col m-auto py-16 px-4 lg:px-[90px] space-y-3 bg-slate-300'>

            <div className='w-full py-3'>

                <p className='text-sm'>Cardoclock is only supported on a computer. We're working on getting it up and running on tablets and phones.</p>

            </div>

        </div>

    </div>
  )
}

export default NotSupported