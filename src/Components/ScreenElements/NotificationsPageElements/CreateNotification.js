//////////////---React imports---////////////////////
import React, { Fragment, useEffect, useState, useRef } from 'react';

//////////////---Headless ui imports---////////////////////
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Switch, Input } from '@headlessui/react'
import clsx from 'clsx';

//////////////---Material UI imports---///////////////
import { Tooltip, CircularProgress, Divider } from '@mui/material';

//////////////---Icon imports---////////////////////
import CloseIcon from '@mui/icons-material/Close';

//////////////---Yup imports---////////////////////
import * as Yup from 'yup';

//////////////---Formik imports---////////////////////
import { useFormik } from 'formik';

//////////////---Formik imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Context imports---////////////////////
import { useAuth } from '../../../Context/AuthContext';

//////////////---Screen imports---////////////////////
import SelectInput from '../../Inputs/SelectInput';
import SimpleInput from '../../Inputs/SimpleInput';
import AdvancedInput from '../../Inputs/AdvancedInput';
import TextAreaInput from '../../Inputs/TextAreaInput';
import ColorInput from '../../Inputs/ColorInput';
import NotificationPreview from '../../ScreenElements/NotificationsPageElements/NotificationPreview';
import InputLoader from '../../Loaders/InputLoader';

//////////////---API imports---////////////////////
import { submitProjectMessage } from '../../../Pages/Slices/SubmitMessageSlice';



const CreateNotification = ({ open, close, enabled, setEnabled, selectedProject, messageType, messagePosition, backgroundColor, setBackgroundColor, textColor, setTextColor }) => {
    const { submitMessageResponse, submitMessageLoading, submitMessageError } = useSelector((state) => state.submitmessage);

    const { session } = useAuth()

    const dispatch = useDispatch()

    useEffect(() => {
        if(selectedProject){
            console.log("selected project: ",selectedProject)
        }
    },[selectedProject])

    const newProjectMessage = useFormik({
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
            borderColor: textColor,
            width: 80,
            createdAt: new Date()
        },
        onReset: () => {
            setBackgroundColor("#ffffff")
            setTextColor("#000000")
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
                borderColor: textColor,
                width: values?.width,
                borderWidth: 2,
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

    return (
        <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={() => { }}>

            <DialogBackdrop className="fixed inset-0 bg-black/30" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">

                <div className="flex min-h-full items-center justify-center p-4">

                    <DialogPanel
                        transition
                        className="w-full md:w-4/5 lg:w-3/5 flex flex-col rounded-lg shadow-xl p-2 md:p-6 border backdrop-blur-2xl bg-[#fff7ed] duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >

                        <div className='w-full h-9 flex flex-row'>

                            <DialogTitle as="h3" className="text-base/7 font-medium text-gray-950">
                                Create Message
                            </DialogTitle>

                            <button type='button' onClick={close} className='w-9 h-full ml-auto align-middle p-1 cursor-pointer'>
                                <CloseIcon />
                            </button>

                        </div>

                        <div className='relative w-full flex flex-col mx-auto px-3'>

                            <form className='w-full h-full flex flex-col mb-8' onSubmit={newProjectMessage?.handleSubmit} onReset={newProjectMessage?.handleReset}>

                                <div className='relative w-full grid grid-cols-1 sm:grid-cols-2'>

                                    <div className='relative w-full h-full py-1 md:p-3'>

                                        <div className='w-full flex flex-row mt-5'>

                                            <p className="text-sm/6 mr-5 text-gray-950">Enable Message:</p>

                                            <Switch
                                                checked={enabled}
                                                onChange={() => setEnabled(!enabled)}
                                                className="group inline-flex h-6 w-11 ml-5 items-center rounded-full bg-gray-200 transition data-[checked]:bg-gray-950"
                                            >
                                                <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                                            </Switch>

                                        </div>

                                    </div>

                                    <div className='relative w-full h-full px-3'></div>

                                </div>

                                <div className='relative w-full grid grid-cols-1 sm:grid-cols-2'>

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

                                </div>

                                <div className='relative w-full grid grid-cols-1 sm:grid-cols-2'>

                                    <div className='relative w-full h-full flex flex-row py-1 md:p-3'>
                                        <AdvancedInput label={'Target Route'} type={'text'} placeholder={'Insert route name'} name={'route'} value={newProjectMessage?.values.route} onChange={newProjectMessage?.handleChange('route')} />
                                    </div>

                                    <div className='relative w-full h-full py-1 md:p-3'>
                                        <SimpleInput label={'Message Title'} type={'text'} placeholder={'Insert message title'} name={'messageTitle'} value={newProjectMessage?.values.messageTitle} onChange={newProjectMessage?.handleChange('messageTitle')} />
                                    </div>

                                </div>

                                <div className='relative w-full p-1 md:p-3'>

                                    <div className='relative w-full h-full py-1'>
                                        <TextAreaInput label={'Message Content'} type={'text'} placeholder={'Insert message content'} name={'messageContent'} value={newProjectMessage?.values.messageContent} onChange={newProjectMessage?.handleChange('messageContent')} />
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

                                <div className='relative w-full p-3'>

                                    <NotificationPreview label={'Preview'} textColor={textColor} backgroundColor={backgroundColor} type={newProjectMessage?.values.messageType} title={newProjectMessage?.values.messageTitle} content={newProjectMessage?.values.messageContent} />

                                </div>

                                <div className='relative w-[296px] h-10 mt-12 mx-auto flex flex-row'>

                                    <div className='w-1/2 h-full pr-1'>
                                        <button type='submit' className={`w-full h-full relative rounded ${true ? 'bg-gray-950' : 'bg-gray-400'} py-2 px-4 text-sm text-white data-[hover]:bg-gray-800`}>{submitMessageLoading ? <CircularProgress size={20} color='#ffffff' /> : 'Create Message'}</button>
                                    </div>

                                    <div className='w-1/2 h-full pl-1'>
                                        <button type='reset' className={`w-full h-full relative rounded border border-gray-950 py-2 px-4 text-sm text-gray-950 data-[hover]:bg-gray-800`}>{'Reset'}</button>
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