import React, { Fragment } from 'react'

//////////////---Headless ui imports---////////////////////
import clsx from 'clsx';
import { Description, Textarea } from '@headlessui/react'


const TextAreaInput = ({ label, placeholder, name, value, onChange, touched, error }) => {
  return (
    <div className='w-full flex flex-col'>
            <p className="text-sm/6 text-foreground mb-1">{label}</p>
            <Textarea name={name} as={Fragment}>
                {({ focus, hover }) => (
                    <textarea placeholder={placeholder} onBlur={touched} className={clsx('h-24 p-1 bg-background border border-foreground text-foreground rounded-lg', focus && 'border-primary', hover && 'shadow')} value={value} onChange={onChange}></textarea>
                )}
            </Textarea>
            {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        </div>
  )
}

export default TextAreaInput