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

//////////////---Screen imports---////////////////////
import ReactCodeSnippet from './ReactCodeSnippet';
import NextCodeSnippet from './NextCodeSnippet';



const SnippetTabs = () => {

    const installCommands = {
        React: "React",
        Next: "Next",
    };

    const [activeTab, setActiveTab] = useState("React");

    return (
        <div className="w-full">
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
            {activeTab === 'React' && <ReactCodeSnippet />}
            {activeTab === 'Next' && <NextCodeSnippet />}

        </div>
    )
}

export default SnippetTabs