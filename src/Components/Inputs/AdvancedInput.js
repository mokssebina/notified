import React, { Fragment } from 'react'

//////////////---Icon imports---////////////////////
import { InformationCircleIcon } from '@heroicons/react/24/outline';

//////////////---MUI imports---////////////////////
import { Tooltip } from '@mui/material';

//////////////---Headless ui imports---////////////////////
import clsx from 'clsx';

//////////////---Headless ui imports---////////////////////
import { Description, Input } from '@headlessui/react'


const AdvancedInput = ({ label, type, placeholder, name, value, onChange, error }) => {
    return (
        <div className='w-full flex flex-col'>
            <div className='text-sm/6 mb-3 flex flex-row'>
                <p className="text-gray-950 mr-2">{label}</p>
                <Tooltip title={'Remember to add add the / when you insert the route name.'}>
                    <InformationCircleIcon className='size-6 cursor-pointer' />
                </Tooltip>
            </div>
            <Input type={type} name={name} as={Fragment}>
                {({ focus, hover }) => <input placeholder={placeholder} className={clsx('w-full h-12 p-1 border border-gray-500 rounded-lg', focus && 'bg-gray-100', hover && 'shadow')} value={value} onChange={onChange} />}
            </Input>
            {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        </div>
    )
}

export default AdvancedInput