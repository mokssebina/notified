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
import PageHeader from '../Components/LayoutElements/PageHeader';
import SelectInput from '../Components/Inputs/SelectInput';
import UpdateNotification from '../Components/ScreenElements/NotificationsPageElements/UpdateNotification';
import NotificationItem from '../Components/ScreenElements/NotificationsPageElements/NotificationItem';
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
        console.log("console log: ", 'closed')
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
                /*
                title: selecteditem?.title,
                description: selecteditem?.description,
                messageCount: selecteditem?.messageCount + 1,
                key: selecteditem?.key
            */
            }))
            dispatch(resetSubmitMessage())
            dispatch(getProjectMessages(''))
            setNewMessage(false)
            setSelectedProject(null)
        }
    }, [submitMessageResponse])

    useEffect(() => {
        if (submitMessageError) {
            console.log("projects exist")
            toast.error(submitMessageError)
            dispatch(resetSubmitMessage())
            dispatch(getProjectMessages(''))
        }
    }, [submitMessageError])

    //////////////////// Update message feedback & cleanup ////////////////////////

    useEffect(() => {
        if (updatedMessage) {
            toast.success("The notification has been updated.")
            dispatch(resetUpdateMessageResponse())
            dispatch(getProjectMessages(''))
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

            <UpdateNotification
                open={editMessage}
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

            <div className='w-full lg:w-10/12 flex flex-col py-4 mx-auto'>

                <PageHeader title={'Messages'} />

                <div className='w-full h-full flex flex-row'>

                    <div className='relative w-1/2 flex flex-col'>

                        <div className='w-full sm:w-72'>

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

                    <div className={`w-full md:w-1/2 flex flex-row px-3`}>

                        <Tooltip title={(newMessage || editMessage) && "Select a project to create a notification."}>
                            <button disabled={newMessage || editMessage} onClick={createNewMessage} className={`w-40 h-12 ml-auto px-3 my-4 rounded-lg border ${!false ? 'bg-slate-500' : 'bg-slate-950'} text-white align-middle`}>
                                <div className='flex flex-row space-x-2 align-middle'>
                                    <Add />
                                    <p>Create New</p>
                                </div>
                            </button>
                        </Tooltip>

                    </div>

                </div>

            </div>

            <div className='w-full lg:w-10/12 flex flex-col mt-12 mx-auto'>

                {selectedProject &&

                    <div className='w-full'>

                        {projectMessagesLoading && <NotificationLoaderItem />}

                        {(!projectMessagesLoading && projectMessages?.length > 0) &&
                            <>
                                {projectMessages?.slice()
                                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((item) => (
                                        <NotificationItem key={item?.id} title={item?.title} projectKey={item?.project_key} content={item?.content}
                                            enabled={item?.is_active} position={item?.position} route={item?.route} type={item?.type} editMessage={() => openEditMessage(item)}
                                            deleteMessage={() => openDeleteMessage(item?.id)}
                                        />
                                    ))}
                            </>
                        }

                        {(!projectMessagesLoading && !projectMessages?.length) && <p className='font-semibold text-sm text-gray-500 mt-6'>There are no message for this item...</p>}

                    </div>

                }

            </div>

        </div>
    )
}

export default Notifications

{/*newMessage &&
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
*/}
