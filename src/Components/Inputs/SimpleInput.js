import React, { Fragment } from 'react'

//////////////---Headless ui imports---////////////////////
import clsx from 'clsx';
import { Description, Input } from '@headlessui/react'


const SimpleInput = ({ label, type, disabled, placeholder, name, value, onChange, error }) => {
  return (
    <div className='w-full flex flex-col'>
            <p className="text-sm/6 text-gray-950 mb-3">{label}</p>
            <Input type={type} name={name} as={Fragment}>
                {({ focus, hover }) => <input disabled={disabled} placeholder={placeholder} className={clsx('w-full h-12 p-1 border border-gray-500 rounded-lg', focus && 'bg-gray-100', hover && 'shadow')} value={value} onChange={onChange} />}
            </Input>
            {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        </div>
  )
}

export default SimpleInput