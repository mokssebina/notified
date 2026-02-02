//////////////---React imports---////////////////////
import React, { Fragment, useEffect, useState, useRef } from 'react';

//////////////---Headless ui imports---////////////////////
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Switch } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';

//////////////---Material UI imports---///////////////
import { Tooltip, CircularProgress } from '@mui/material';

//////////////---Icon imports---////////////////////
import CloseIcon from '@mui/icons-material/Close';

//////////////---Yup imports---////////////////////
import { object, string, number, date, boolean } from 'yup';

//////////////---Formik imports---////////////////////
import { useFormik } from 'formik';

//////////////---Formik imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Context imports---////////////////////
import { useAuth } from '../../../Context/AuthContext';

//////////////---Input imports---////////////////////
import SelectInput from '../../Inputs/SelectInput';
import SimpleInput from '../../Inputs/SimpleInput';
import AdvancedInput from '../../Inputs/AdvancedInput';
import TextAreaInput from '../../Inputs/TextAreaInput';
import ColorInput from '../../Inputs/ColorInput';
import RadioInputs from '../../Inputs/RadioInputs';

//////////////---Screen imports---////////////////////
import NotificationPreview from '../../ScreenElements/NotificationsPageElements/NotificationPreview';
import InputLoader from '../../Loaders/InputLoader';

//////////////---API imports---////////////////////
import { submitProjectMessage } from '../../../Pages/Slices/SubmitMessageSlice';



const CreateNotification = ({ open, close, enabled, setEnabled, selectedProject, messageType, messagePosition, backgroundColor, setBackgroundColor, borderColor, setBorderColor, textColor, setTextColor }) => {
    const { submitMessageResponse, submitMessageLoading, submitMessageError } = useSelector((state) => state.submitmessage);

    const { session } = useAuth()

    const dispatch = useDispatch()

    const types = [
        { id: 1, name: "view only", description: "" },
        { id: 2, name: "dismiss", description: "This is allows users to dismiss the message once they've read it." },
        { id: 3, name: "external", description: "This is ideal for navigating users to an external link." },
        { id: 4, name: "navigate", description: "This is used to navigate user to a different page within the app." }
    ]
    const [selected, setSelected] = useState(types[0].name);


    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    useEffect(() => {
        if (selectedProject) {
            console.log("selected project: ", selectedProject)
        }
    }, [selectedProject])

    const validations = object({
        //enabled: boolean().required(),
        messageType: string().required(),
        route: string().required(),
        messageTitle: string().required(),
        messageContent: string().required(),
        position: string().required(),
        //backgroundColor: string().required(),
        //textColor: string().required(),
        //borderColor: string().required(),
        //width: number().required(),
        //click_url: string().required(),
        //created: date().required()
    })
//'You must specify which route should display the message.'
    const newProjectMessage = useFormik({
        validationSchema: validations,
        initialValues: {
            enabled: enabled,
            projectKey: selectedProject?.key,
            projectId: selectedProject?.id,
            messageType: 'Information',
            route: '',
            messageTitle: '',
            messageContent: '',
            position: 'bottom',
            backgroundColor: backgroundColor,
            textColor: textColor,
            borderColor: borderColor,
            width: 80,
            click_action: selected,
            click_url: "",
            createdAt: new Date()
        },
        onReset: () => {
            setBackgroundColor("#14161a")
            setTextColor("#ffffff")
        },
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            console.log("form values: ", values)
            let data = {
                enabled: enabled,
                projectKey: selectedProject?.key,
                messageType: values?.messageType,
                route: values?.route,
                title: values?.messageTitle,
                content: values?.messageContent,
                position: values?.position,
                backgroundColor: backgroundColor,
                textColor: textColor,
                borderColor: borderColor,
                width: values?.width,
                borderWidth: 2,
                click_action: values.click_action,
                click_url: values.click_url,
            }
            console.log("submitted data: ", data)
            dispatch(submitProjectMessage(data))

        }
    })

    useEffect(() => {
        if (submitMessageResponse) {
            newProjectMessage?.resetForm()
        }
        if (submitMessageError) {
            newProjectMessage?.resetForm()
        }
    }, [submitMessageResponse, submitMessageError])

    const reset = () => {
        newProjectMessage.resetForm()
    }

    return (
        <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={() => { }}>

            <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-md" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">

                <div className="flex min-h-full items-center justify-center p-4">

                    <DialogPanel
                        transition
                        className="w-full md:w-4/5 lg:w-3/5 flex flex-col rounded-lg p-2 md:p-6 border border-primary/30 shadow-lg shadow-primary/40 backdrop-blur-2xl bg-background duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >

                        <div className='w-full h-9 flex flex-row'>

                            <DialogTitle as="h3" className="text-base/7 font-medium text-foreground">
                                Create Message
                            </DialogTitle>

                            <button type='button' onClick={() => { close(); reset() }} className='w-9 h-full ml-auto align-middle p-1 text-foreground cursor-pointer'>
                                <CloseIcon />
                            </button>

                        </div>

                        <div className='relative w-full flex flex-col mx-auto pt-5 px-3'>

                            <form className='w-full h-full flex flex-col mb-8' onSubmit={newProjectMessage?.handleSubmit} onReset={newProjectMessage?.handleReset}>

                                <div className='relative w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>

                                    <div className='relative w-full h-full py-1 md:p-3'>

                                        <div className='w-full flex flex-row'>

                                            <p className="text-sm/6 mr-5 text-foreground">Enable Message:</p>

                                            <Switch
                                                checked={enabled}
                                                onChange={() => setEnabled(!enabled)}
                                                className="group inline-flex h-6 w-11 ml-5 items-center rounded-full bg-gray-950 transition data-[checked]:bg-primary"
                                            >
                                                <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                                            </Switch>

                                        </div>

                                    </div>

                                    <div className='relative w-full h-full px-3'>
                                        <SimpleInput
                                            label={'Message Title'}
                                            type={'text'}
                                            placeholder={'Insert message title'}
                                            name={'messageTitle'}
                                            value={newProjectMessage?.values.messageTitle}
                                            onChange={newProjectMessage?.handleChange('messageTitle')}
                                        />
                                    </div>

                                    <div className='relative w-full h-full flex flex-row md:px-3'>
                                        <AdvancedInput label={'Target Route'} type={'text'} placeholder={'Insert route name'} name={'route'} value={newProjectMessage?.values.route} onChange={newProjectMessage?.handleChange('route')} />
                                    </div>

                                </div>

                                <div className='relative w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>

                                    <div className='relative w-full h-full py-1 md:p-3'>
                                        <SelectInput
                                            name={'position'}
                                            label={'Select message position'}
                                            selectedProject={newProjectMessage?.values.position}
                                            handleSelect={(e) => newProjectMessage?.setFieldValue('position', e.target.value)}
                                            projects={
                                                messagePosition?.map((item) => (
                                                    <option key={item?.id} value={item?.value}>{item?.position}</option>
                                                ))}
                                        />
                                    </div>

                                    <div className='relative w-full h-full py-1 md:p-3'>
                                        <SelectInput
                                            name={'messageType'}
                                            label={'Select message type'}
                                            selectedProject={newProjectMessage?.values.messageType}
                                            handleSelect={(e) => newProjectMessage?.setFieldValue('messageType', e.target.value)}
                                            projects={
                                                messageType?.map((item) => (
                                                    <option key={item?.id} value={item?.type}>{item?.type}</option>
                                                ))}
                                        />
                                    </div>

                                </div>

                                <div className='relative w-full grid grid-cols-1 sm:grid-cols-2'>

                                    <div className='relative w-full p-1 md:p-3'>

                                        <div className='relative w-full h-full py-1'>
                                            <TextAreaInput label={'Message Content'} type={'text'} placeholder={'Insert message content'} name={'messageContent'} value={newProjectMessage?.values.messageContent} onChange={newProjectMessage?.handleChange('messageContent')} />
                                        </div>

                                    </div>

                                    <div className='relative w-full flex flex-col p-1 md:p-3'>
                                        <p className="text-foreground mr-2 mb-2">Action Type</p>
                                        <div className='relative w-full'>
                                            <RadioInputs types={types} selected={selected} handleChange={handleChange} />
                                        </div>
                                    </div>

                                </div>

                                <div className='relative w-full grid grid-cols-1 sm:grid-cols-2'>

                                    <div className='relative w-full h-full flex flex-row py-1 md:p-3'>
                                        <ColorInput label={'Background Color'} type={'text'} value={backgroundColor} color={backgroundColor} setColor={setBackgroundColor} onChange={(event) => setBackgroundColor(event.target.value)} />
                                    </div>

                                    <div className='relative w-full h-full flex flex-row py-1 md:p-3'>
                                        <ColorInput label={'Text Color'} type={'text'} value={textColor} color={textColor} setColor={setTextColor} onChange={(event) => setTextColor(event.target.value)} />
                                    </div>

                                </div>

                                <div className='relative w-full grid grid-cols-1 sm:grid-cols-2'>

                                    <div className='relative w-full h-full flex flex-row py-1 md:p-3'>
                                        <ColorInput label={'Shadow Color'} type={'text'} value={borderColor} color={borderColor} setColor={setBorderColor} onChange={(event) => setBorderColor(event.target.value)} />
                                    </div>

                                    <div className='relative w-full h-full flex flex-row py-1 md:p-3'>
                                    </div>

                                </div>

                                <div className='relative w-full p-3'>

                                    <NotificationPreview label={'Preview'} textColor={textColor} backgroundColor={backgroundColor} borderColor={borderColor} type={newProjectMessage?.values.messageType} title={newProjectMessage?.values.messageTitle} content={newProjectMessage?.values.messageContent} selected={selected} />

                                </div>

                                <div className='relative w-[296px] h-10 mt-12 mx-auto flex flex-row'>

                                    <div className='w-1/2 h-full pr-1'>
                                        <button type='submit' className={`w-full h-full relative rounded ${true ? 'bg-primary' : 'bg-primary/50'} py-2 px-4 text-sm text-white`}>{submitMessageLoading ? <CircularProgress size={20} color='#ffffff' /> : 'Create Message'}</button>
                                    </div>

                                    <div className='w-1/2 h-full pl-1'>
                                        <button type='reset' className={`w-full h-full relative rounded border border-primary py-2 px-4 text-sm text-primary data-[hover]:bg-primary/50`}>{'Reset'}</button>
                                    </div>

                                </div>

                            </form>

                        </div>
                    </DialogPanel>

                </div>

            </div>

        </Dialog>
    )
}

export default CreateNotification