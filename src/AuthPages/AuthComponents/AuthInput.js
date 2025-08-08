import React, { Fragment } from 'react'
import clsx from 'clsx';
import { Description, Input } from '@headlessui/react'



const AuthInput = ({ label, type, placeholder, name, value, onChange, touched, error }) => {
    return (
        <div className='w-full flex flex-col'>
            <p className="text-sm/6 text-gray-950">{label}</p>
            <Input type={type} name={name} as={Fragment}>
                {({ focus, hover }) => <input placeholder={placeholder} className={clsx('w-full sm:w-80 h-12 p-1 border border-gray-500 rounded-lg', focus && 'bg-gray-100', hover && 'shadow')} onBlur={touched} value={value} onChange={onChange} />}
            </Input>
            {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        </div>
    )
}

export default AuthInput