import React, { Fragment } from 'react'

//////////////---Color picker imports---////////////////////
import { HexColorPicker } from 'react-colorful'

//////////////---Headless ui imports---////////////////////
import clsx from 'clsx';
import { Description, Input, Popover, PopoverButton, PopoverPanel, Portal } from '@headlessui/react'


const ColorInput = ({ label, type, value, color, setColor, onChange }) => {
    return (
        <div className='w-full flex flex-col'>
            <p className="text-sm/6 text-foreground mb-3">{label}</p>
            <div className='w-full flex flex-row'>
                <div className='w-1/5'>
                    <Popover className='relative'>
                        <PopoverButton className='w-full h-12 rounded-lg border border-foreground p-2'>
                            <div style={{ backgroundColor: `${color}` }} className={`w-full h-full rounded border border-foreground bg-background`}></div>
                        </PopoverButton>
                        <PopoverPanel transition anchor='right' className='p-2 aspect-square z-50 rounded-lg border border-foreground bg-background'>
                            <div className='w-full'>
                                <HexColorPicker color={color} onChange={setColor} />
                            </div>
                        </PopoverPanel>
                    </Popover>
                    {/*<div className='w-full h-12 rounded-lg border border-gray-500 p-1'>
                        <div className='w-full h-full rounded-md bg-slate-500'></div>
                    </div>*/}
                </div>
                <div className='w-4/5 pl-2'>
                    <Input type={type} as={Fragment}>
                        {({ focus, hover }) => <input className={clsx('w-full h-12 p-1 bg-background border border-foreground text-foreground rounded-lg', focus && 'border-primary', hover && 'shadow')} value={value} onChange={onChange} />}
                    </Input>
                </div>
            </div>
        </div>
    )
}

export default ColorInput