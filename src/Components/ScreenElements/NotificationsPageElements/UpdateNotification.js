//////////////---React imports---////////////////////
import React, { Fragment, useEffect, useState, useRef } from 'react';

//////////////---Headless ui imports---////////////////////
import { Button, Switch, Input } from '@headlessui/react';
import clsx from 'clsx';

//////////////---Material UI imports---///////////////
import { Tooltip, CircularProgress, Divider } from '@mui/material';

//////////////---Material UI imports---////////////////////
import { CloseOutlined } from '@mui/icons-material'

//////////////---Yup imports---////////////////////
import * as Yup from 'yup';

//////////////---Formik imports---////////////////////
import { useFormik } from 'formik';

//////////////---Formik imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Screen imports---////////////////////
import SelectInput from '../../Inputs/SelectInput';
import SimpleInput from '../../Inputs/SimpleInput';
import AdvancedInput from '../../Inputs/AdvancedInput';
import TextAreaInput from '../../Inputs/TextAreaInput';
import ColorInput from '../../Inputs/ColorInput';
import NotificationPreview from '../../ScreenElements/NotificationsPageElements/NotificationPreview';
import InputLoader from '../../Loaders/InputLoader';

//////////////---API imports---////////////////////
import { updateProjectMessage } from '../../../Pages/Slices/UpdateMessageSlice';



const UpdateNotification = ({ close, enabled, setEnabled, editMessageItem, messageType, messagePosition, backgroundColor, setBackgroundColor, textColor, setTextColor }) => {

    const { updatedMessageLoading } = useSelector((state) => state.updateprojectmessage);
    
    
    const dispatch = useDispatch()

    const editProjectMessage = useFormik({
        initialValues: {
            enabled: enabled,
            projectKey: editMessageItem?.project_key,
            messageType: editMessageItem?.type,
            route: editMessageItem?.route,
            messageTitle: editMessageItem?.title,
            messageContent: editMessageItem?.content,
            position: editMessageItem?.position,
            backgroundColor: backgroundColor,
            textColor: textColor,
            borderColor: textColor,
        },
        onReset: () => {
            //resetForm()
        },
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            let data = {
                enabled: enabled,
                project_key: values?.projectKey,
                type: values?.messageType,
                route: values?.route,
                title: values?.messageTitle,
                content: values?.messageContent,
                position: values?.position,
                backgroundColor: backgroundColor,
                textColor: textColor,
                borderColor: textColor,
                id: editMessageItem?.id
            }
            console.log("update values: ",data)

            dispatch(updateProjectMessage(data))
        }
    })

    return (
        <div className='relative w-full flex flex-col mx-auto px-3'>

            <div className='w-full flex flex-row px-3 mt-4'>

                <p className='font-semibold text-lg'>Update notification</p>

                <button onClick={close} className='w-8 h-8 ml-auto align-middle'>
                    <div className='flex flex-row space-x-2 align-middle'>
                        <CloseOutlined />
                    </div>
                </button>

            </div>

            <form className='w-full h-full flex flex-col mb-8' onSubmit={editProjectMessage?.handleSubmit} onReset={editProjectMessage?.handleReset}>

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
                            label={'Select message type'}
                            selectedProject={editProjectMessage?.values.messageType}
                            handleSelect={() => editProjectMessage?.setFieldValue('messageType')}
                            projects={
                                messageType?.map((item) => (
                                    <option key={item?.id} value={item?.type}>{item?.type}</option>
                                ))}
                        />
                    </div>

                    <div className='relative w-full h-full py-1 md:p-3'>
                        <SelectInput
                            label={'Select message position'}
                            selectedProject={editProjectMessage?.values.position}
                            handleSelect={() => editProjectMessage?.setFieldValue('position')}
                            projects={
                                messagePosition?.map((item) => (
                                    <option key={item?.id} value={item?.value}>{item?.position}</option>
                                ))}
                        />
                    </div>

                </div>

                <div className='relative w-full grid grid-cols-1 sm:grid-cols-2'>

                    <div className='relative w-full h-full flex flex-row py-1 md:p-3'>
                        <AdvancedInput label={'Target Route'} type={'text'} placeholder={'Insert route name'} name={'route'} value={editProjectMessage?.values.route} onChange={editProjectMessage?.handleChange('route')} />
                    </div>

                    <div className='relative w-full h-full py-1 md:p-3'>
                        <SimpleInput label={'Message Title'} type={'text'} placeholder={'Insert message title'} name={'messageTitle'} value={editProjectMessage?.values.messageTitle} onChange={editProjectMessage?.handleChange('messageTitle')} />
                    </div>

                </div>

                <div className='relative w-full p-3'>

                    <div className='relative w-full h-full py-1'>
                        <TextAreaInput label={'Message Content'} type={'text'} placeholder={'Insert message content'} name={'messageContent'} value={editProjectMessage?.values.messageContent} onChange={editProjectMessage?.handleChange('messageContent')} />
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

                    <NotificationPreview label={'Preview'} textColor={textColor} backgroundColor={backgroundColor} type={editProjectMessage?.values.messageType} title={editProjectMessage?.values.messageTitle} content={editProjectMessage?.values.messageContent} />

                </div>

                <div className='relative w-[296px] h-10 mt-12 mx-auto flex flex-row'>

                    <div className='w-1/2 h-full pr-1'>
                        <button type='submit' className={`w-full h-full relative rounded ${true ? 'bg-gray-950' : 'bg-gray-400'} py-2 px-4 text-sm text-white data-[hover]:bg-gray-800`}>{updatedMessageLoading ? <CircularProgress size={20} color='#ffffff' /> : 'Update'}</button>
                    </div>

                    <div className='w-1/2 h-full pl-1'>
                        <button type='reset' className={`w-full h-full relative rounded border border-gray-950 py-2 px-4 text-sm text-gray-950 data-[hover]:bg-gray-800`}>{'Reset'}</button>
                    </div>

                </div>

            </form>

        </div>
    )
}

export default UpdateNotification