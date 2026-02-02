import React, { useState } from "react";

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast';

//////////////---Clipboard imports---////////////////////
import clipboard from 'clipboardy';

//////////////---Headless UI imports---////////////////////
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import clsx from 'clsx'

//////////////---MUI imports---////////////////////
import { Tooltip } from '@mui/material'

//////////////---Icon imports---////////////////////
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'



const installCommands = {
    React: ["npm install react-notified", "yarn add react-notified"],
    Next: ["npm add react-notified-next", "yarn add react-notified-next"],
};

export default function InstallTabs() {

    const [activeTab, setActiveTab] = useState("React");

    const copyText = (value) => {
        clipboard.write(value)
        toast.success('Copied!')
    }

    return (
        <div className="w-full max-w-xl">
            {/* Tabs */}
            <div className="flex space-x-6 border-b border-gray-200 text-sm font-medium">
                {Object.keys(installCommands).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 -mb-px transition-colors ${activeTab === tab
                            ? "text-primary border-b-2 border-primary"
                            : "text-foreground"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Code block */}
            <div className="bg-muted text-foreground rounded-xl mt-4 px-4 pb-4 font-mono text-sm border border-primary/30 shadow-lg shadow-primary/40">
                {installCommands[activeTab].map((item) => (
                    <div className="w-full flex flex-row mt-5">
                        <code>{item}</code>
                        <Tooltip title='Copy' className='hidden md:block'>
                            <ClipboardDocumentIcon onClick={() => copyText(item)} className={clsx('hidden md:block w-5 cursor-pointer ml-auto')} />
                        </Tooltip>
                    </div>
                ))}
            </div>
        </div>
    );
}
