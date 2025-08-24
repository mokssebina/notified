import React, { useState } from "react";

/////////////---Icon imports---////////////////////
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

/////////////---Screen imports---////////////////////
import { Switch } from '@headlessui/react'
import SelectInput from "../Inputs/SelectInput";
import SimpleInput from "../Inputs/SimpleInput";
import TextAreaInput from "../Inputs/TextAreaInput";


const ToggleDemo = ({ messageType, handleMessageType, messageTitle, handleTitle, position, handlePosition, content, handleContent, isEnabled, setIsEnabled }) => {

    const messages = [
        {
            route: "/dashboard",
            status: "operational",
            message: "Dashboard is running smoothly",
            icon: CheckCircle,
            color: "text-green-500"
        },
        {
            route: "/api/payments",
            status: "degraded",
            message: "Payment processing experiencing delays",
            icon: Clock,
            color: "text-amber-500"
        },
        {
            route: "/upload/*",
            status: "down",
            message: "File uploads temporarily unavailable",
            icon: AlertTriangle,
            color: "text-red-500"
        }
    ];

    let messagePosition = [
        { id: 1, position: 'Top of page', value: 'top' },
        { id: 2, position: 'Bottom of page', value: 'bottom' }
    ]
    let messageTypes = [
        { id: 1, type: 'Information' },
        { id: 2, type: 'Warning' },
        { id: 3, type: 'Error' }
    ]

    return (
        <div className="w-full md:w-4/5 lg:max-w-4xl mx-auto">
            {/* Toggle Control */}
            <div className="flex items-center justify-center space-x-4 mb-8">

                <span className={`text-sm font-medium transition-colors ${!isEnabled ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Message Off
                </span>

                <Switch
                    checked={isEnabled}
                    onChange={setIsEnabled}
                    className="group inline-flex h-6 w-11 ml-5 items-center rounded-full bg-gray-950 transition data-[checked]:bg-primary"
                >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                </Switch>

                <span className={`text-sm font-medium transition-colors ${isEnabled ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Message On
                </span>
            </div>

            {/* Messages Demo */}
            <div className="space-y-4 flex flex-col">
                <div className="w-full flex flex-row">
                    <div className="w-full md:w-1/2 px-1">
                        <SelectInput
                            name={''}
                            label={'Select message type'}
                            selectedProject={messageType}
                            handleSelect={handleMessageType}
                            projects={
                                messageTypes?.map((item) => (
                                    <option key={item?.id} value={item?.type}>{item?.type}</option>
                                ))}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-1">
                        <SelectInput
                            name={''}
                            label={'Select message position'}
                            selectedProject={position}
                            handleSelect={handlePosition}
                            projects={
                                messagePosition?.map((item) => (
                                    <option key={item?.id} value={item?.value}>{item?.position}</option>
                                ))}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-row">
                    <div className="w-full md:w-1/2 px-1">
                        <SimpleInput label={'Message Title'} type={'text'} placeholder={'Insert message title'} name={''} value={messageTitle} onChange={handleTitle} />
                    </div>
                    <div className="w-full md:w-1/2 px-1">
                    </div>
                </div>
                <div className="w-full flex">
                    <TextAreaInput label={'Message Content'} type={'text'} placeholder={'Insert message content'} name={''} value={content} onChange={handleContent} />
                </div>
            </div>

            {/* Code Preview */}
            <div className="mt-8 bg-muted/50 rounded-lg p-4 sm:p-6 border border-border/30">
                <h3 className="text-sm font-semibold text-foreground mb-3">Integration Example</h3>
                <div className="overflow-x-auto">
                    <pre className="text-xs text-muted-foreground font-mono whitespace-pre">
                        
                        {`import { Notified } from '@notified/react';

// Just add one component to your app
<NotifiedProvider 
  projectKey="your-project-key"
  route={location.pathname}
/>`}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default ToggleDemo;