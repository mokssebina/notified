import React from 'react'

//////////////---Headless ui imports---////////////////////
import clsx from 'clsx';
import { Select } from '@headlessui/react'


const SelectInput = ({ label, name, projects, selectedProject, handleSelect }) => {
    return (
        <>
        <p className='text-foreground text-sm/6 mb-1'>{label}</p>
        <Select name={name} value={selectedProject} onChange={handleSelect} className='relative w-full bg-background text-foreground border border-foreground h-12 rounded-lg px-2 py-1'>
            <option value="">--Select--</option>
            {projects}
        </Select>
        </>
    )
}

export default SelectInput