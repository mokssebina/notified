import React from 'react'
import PageHeader from '../Components/LayoutElements/PageHeader'
import cactusgif from '../Assets/images/cactus.gif'


const Subscription = () => {
  return (
    <div className='relative w-full flex flex-col p-4'>

      <div className='w-full lg:w-10/12 h-24 flex flex-col py-4 mt-10 mx-auto'>

        <PageHeader title={'Subscription History'} />

        <div className='w-full mt-12 md:mt-24'>
          <p className='font-semibold text-base text-gray-500 text-center'>We're still working on this section. We'll have it up and running soon...</p>
          <div className='w-full h-auto md:w-2/5 mx-auto'>
            <img alt="desert-cactus" className='w-full aspect-auto' src={cactusgif} />
          </div>
        </div>

      </div>

    </div>
  )
}

export default Subscription