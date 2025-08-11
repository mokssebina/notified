//////////////---React imports---////////////////////
import React, { Fragment, useEffect, useState, useRef } from 'react';

//////////////---Headless ui imports---////////////////////
import { Button, Switch, Input } from '@headlessui/react';
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



const CreateNotification = ({ close, enabled, setEnabled, selectedProject, messageType, messagePosition, backgroundColor, setBackgroundColor, textColor, setTextColor }) => {

    const { submitMessageResponse, submitMessageLoading, submitMessageError } = useSelector((state) => state.submitmessage);

    const { session } = useAuth()

    const dispatch = useDispatch()

    const newProjectMessage = useFormik({
        initialValues: {
            enabled: enabled,
            projectKey: selectedProject?.key,
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
                user_id: session?.user.id,
                is_active: enabled,
                projectKey: values?.projectKey,
                type: values?.messageType,
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
    }, [submitMessageResponse])

    return (
        <div className='relative w-full flex flex-col mx-auto px-3'>

            <div className='w-full flex flex-row px-3 mt-4'>

                <p className='font-semibold text-lg'>Create notification</p>

                <button onClick={close} className='w-8 h-8 ml-auto align-middle'>
                    <div className='flex flex-row space-x-2 align-middle'>
                        <CloseIcon />
                    </div>
                </button>

            </div>

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

                <div className='relative w-full p-3'>

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
    )
}

export default CreateNotification