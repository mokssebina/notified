//////////////---React imports---////////////////////
import React, { Fragment, useEffect, useState, useRef } from 'react';

//////////////---Routing imports---////////////////////
import { useLocation } from 'react-router-dom';

//////////////---Headless ui imports---////////////////////
import { Button, Switch, Input, Select } from '@headlessui/react';
import clsx from 'clsx';

//////////////---Material UI imports---///////////////
import { Tooltip, CircularProgress, Divider } from '@mui/material';

//////////////---Yup imports---////////////////////
import * as Yup from 'yup';

//////////////---Material UI imports---////////////////////
import { Add } from '@mui/icons-material'

//////////////---Formik imports---////////////////////
import { useFormik } from 'formik';

//////////////---Formik imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast';

//////////////---Screen imports---////////////////////
import SelectInput from '../Components/Inputs/SelectInput';
import UpdateNotification from '../Components/ScreenElements/NotificationsPageElements/UpdateNotification';
import { NotificationItem } from '../Components/ScreenElements/NotificationsPageElements/NotificationItem';
import CreateNotification from '../Components/ScreenElements/NotificationsPageElements/CreateNotification';
import NotificationLoaderItem from '../Components/ScreenElements/NotificationsPageElements/NotificationLoaderItem';

//////////////---API imports---////////////////////
import { getProjectMessages, resetGetProjectMessages } from './Slices/GetMessagesSlice';
import { resetUpdateMessageResponse, resetUpdateMessage } from './Slices/UpdateMessageSlice';
import { deleteProjectMessage } from './Slices/DeleteMessageSlice';
import { resetSubmitMessage } from './Slices/SubmitMessageSlice';
import { updateProject } from './Slices/UpdateProject';



const Notifications = () => {

    const dispatch = useDispatch()
    const location = useLocation()

    const { projects, getProjectsLoading, getProjectsError } = useSelector((state) => state.getprojects);
    const { projectMessages, projectMessagesLoading, projectMessagesError } = useSelector((state) => state.getprojectmessages);
    const { submitMessageResponse, submitMessageLoading, submitMessageError } = useSelector((state) => state.submitmessage);
    const { updatedMessage, updatedMessageLoading, updatedMessageError } = useSelector((state) => state.updateprojectmessage);

    const [selectedId, setSelectedId] = useState('')
    const [selectedProject, setSelectedProject] = useState(null)
    const [enabled, setEnabled] = useState(true)
    const [position, setPosition] = useState('')
    const [type, setType] = useState('')
    const [newMessage, setNewMessage] = useState(false)
    const [editMessage, setEditMessage] = useState(false)
    const [editMessageItem, setEditMessageItem] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')
    const [textColor, setTextColor] = useState('#000000')

    /*
    let messagePosition = [
        { id: 1, position: 'Top of page', value: 'top' },
        { id: 2, position: 'Bottom of page', value: 'bottom' }
    ]
    */
    let messagePosition = [
        { id: 1, position: 'Top of page', value: 'top' },
        { id: 2, position: 'Bottom of page', value: 'bottom' }
    ]
    let messageType = [
        { id: 1, type: 'Information' },
        { id: 2, type: 'Warning' },
        { id: 3, type: 'Error' }
    ]

    const handleSelect = (event) => {
        console.log("selected item: ", event.target.value)
        setSelectedId(event.target.value);
        const selected = projects.find((item) => item.id.toString() === event.target.value);
        setSelectedProject(selected);
        if (selected) {
            dispatch(getProjectMessages(selected.key));
        }
        //setSelectedProject(event.target.value)
        //dispatch(getProjectMessages(event.target.value?.key))
    }

    const selectEditMessage = () => {

    }

    useEffect(() => {
        dispatch(resetGetProjectMessages())
    }, [location.pathname])

    useEffect(() => {
        if (selectedProject) {
            console.log("selected project item: ", selectedProject)
        }
    }, [selectedProject])

    const createNewMessage = () => {
        setNewMessage(true)
    }

    const openEditMessage = (value) => {
        console.log("edit message: ", value)
        setEditMessage(true)
        setEditMessageItem(value)
        setEnabled(value?.is_active)
        setBackgroundColor(value?.backgroundColor)
        setTextColor(value?.textColor)
    }

    const openDeleteMessage = (value) => {
        dispatch(deleteProjectMessage(value))
    }

    const closeCreate = () => {
        setNewMessage(false)
        setSelectedId('')
        setSelectedProject(null)
        dispatch(resetGetProjectMessages())
    }

    const closeEdit = () => {
        setEditMessage(false)
        setSelectedId('')
        setSelectedProject(null)
        setEditMessageItem(null)
        setBackgroundColor('#ffffff')
        setTextColor('#000000')
        dispatch(resetGetProjectMessages())
    }

    //////////////////// Create message feedback & cleanup ////////////////////////

    useEffect(() => {
        if (submitMessageResponse) {
            console.log("projects exist")
            toast.success("The notification has been created.")
            dispatch(updateProject({
                title: selectedProject?.title,
                description: selectedProject?.description,
                messageCount: selectedProject?.messageCount + 1,
                key: selectedProject?.key
            }))
            dispatch(resetSubmitMessage())
            dispatch(getProjectMessages(selectedProject.key))
            setNewMessage(false)
            setSelectedProject(null)
        }
    }, [submitMessageResponse])

    useEffect(() => {
        if (submitMessageError) {
            console.log("projects exist")
            toast.error(submitMessageError)
            dispatch(resetSubmitMessage())
            dispatch(getProjectMessages(selectedProject?.key))
        }
    }, [submitMessageError])

    //////////////////// Update message feedback & cleanup ////////////////////////

    useEffect(() => {
        if (updatedMessage) {
            toast.success("The notification has been updated.")
            dispatch(resetUpdateMessageResponse())
            dispatch(getProjectMessages(selectedProject?.key))
            setEditMessageItem(null)
            setEditMessage(false)
            //setSelectedId('')
            //setSelectedProject(null)
        }
    }, [updatedMessage])

    useEffect(() => {
        if (updatedMessageError) {
            toast.error(updatedMessageError)
            dispatch(resetUpdateMessage())
            dispatch(getProjectMessages(editMessageItem?.key))
            setSelectedId('')
            setSelectedProject(null)
        }
    }, [updatedMessageError])

    return (
        <div className='relative w-full h-full flex flex-col mx-auto rounded-lg'>

            <div className='relative w-full flex flex-row h-24'>

                <div className='w-1/4 h-full'>
                    <div className='relative w-full px-3'>

                        {/*<InputLoader />*/}

                        <SelectInput
                            label={'Select project'}
                            selectedProject={selectedId}
                            handleSelect={handleSelect}
                            projects={
                                projects?.map((item) => (
                                    <option key={item?.id} value={item?.id}>{item?.title}</option>
                                ))
                            }
                        />

                    </div>
                </div>

            </div>

            <div className='w-full h-page flex flex-row'>

                <div className='relative w-1/4 h-auto px-3 flex flex-col'>

                    <Tooltip title={(newMessage || editMessage) && "Select a project to create a notification."}>
                        <button disabled={newMessage || editMessage} onClick={createNewMessage} className={`w-40 h-12 py-3 px-3 my-4 rounded-lg border ${!selectedProject?.key ? 'bg-slate-500' : 'bg-slate-950'} text-white align-middle`}>
                            <div className='flex flex-row space-x-2 align-middle'>
                                <Add />
                                <p>Create New</p>
                            </div>
                        </button>
                    </Tooltip>

                    {selectedProject &&
                        <>
                            <div className='w-1/4 mb-3'>
                                <p className='font-semibold mt-3 text-lg text-left align-middle'>Notifications</p>
                            </div>

                            <div className='w-full'>

                                {projectMessagesLoading && <NotificationLoaderItem />}

                                {(!projectMessagesLoading && projectMessages?.length > 0) &&
                                    <>
                                        {projectMessages?.slice()
                                            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((item) => (
                                                <NotificationItem key={item?.id} title={item?.title} editMessage={() => openEditMessage(item)} deleteMessage={() => openDeleteMessage(item?.id)} />
                                            ))}
                                    </>
                                }

                                {(!projectMessagesLoading && !projectMessages?.length) && <p className='font-semibold text-sm text-gray-500 mt-6'>There are no message for this project...</p>}

                            </div>
                        </>
                    }

                </div>

                <div className={`w-3/4 h-auto flex flex-col px-3 overflow-auto ${(newMessage || editMessage) && 'border border-gray-950 rounded-lg'}`}>

                    {newMessage &&
                        <CreateNotification
                            close={closeCreate}
                            enabled={enabled}
                            setEnabled={setEnabled}
                            selectedProject={selectedProject}
                            messageType={messageType}
                            messagePosition={messagePosition}
                            backgroundColor={backgroundColor}
                            setBackgroundColor={setBackgroundColor}
                            textColor={textColor}
                            setTextColor={setTextColor}
                        />
                    }

                    {editMessage &&
                        <div className='w-full h-full'>
                            <UpdateNotification
                                close={closeEdit}
                                enabled={enabled}
                                setEnabled={setEnabled}
                                selectedProject={selectedProject}
                                editMessageItem={editMessageItem}
                                messageType={messageType}
                                messagePosition={messagePosition}
                                backgroundColor={backgroundColor}
                                setBackgroundColor={setBackgroundColor}
                                textColor={textColor}
                                setTextColor={setTextColor}
                            />
                        </div>
                    }

                </div>

            </div>

        </div>
    )
}

export default Notifications