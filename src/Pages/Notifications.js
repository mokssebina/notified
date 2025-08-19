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
import DeleteModal from '../Components/ScreenElements/ProjectsPageElements/DeleteModal';

//////////////---API imports---////////////////////
import { getProjectMessages, resetGetProjectMessages } from './Slices/GetMessagesSlice';
import { resetUpdateMessageResponse, resetUpdateMessage } from './Slices/UpdateMessageSlice';
import { deleteMessage, resetDeleteMessage } from './Slices/DeleteMessageSlice';
import { resetSubmitMessage } from './Slices/SubmitMessageSlice';
import { updateProject } from './Slices/UpdateProject';



const Notifications = () => {

    const dispatch = useDispatch()
    const location = useLocation()

    const { projects, getProjectsLoading, getProjectsError } = useSelector((state) => state.getprojects);
    const { projectMessages, projectMessagesLoading, projectMessagesError } = useSelector((state) => state.getprojectmessages);
    const { submitMessageResponse, submitMessageLoading, submitMessageError } = useSelector((state) => state.submitmessage);
    const { updatedMessage, updatedMessageLoading, updatedMessageError } = useSelector((state) => state.updateprojectmessage);
    const { deletedMessage, deletedMessageLoading, deletedMessageError } = useSelector((state) => state.deletemessage);


    const [selectedId, setSelectedId] = useState('')
    const [selectedProject, setSelectedProject] = useState(null)
    const [enabled, setEnabled] = useState(true)
    const [newMessage, setNewMessage] = useState(false)
    const [editMessage, setEditMessage] = useState(false)
    const [editMessageItem, setEditMessageItem] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')
    const [textColor, setTextColor] = useState('#000000')
    const [messageDelete, setMessageDelete] = useState(false)
    const [messageId, setMessageId] = useState('')

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
            if(selectedProject?.key){
                dispatch(getProjectMessages(selectedProject?.key))
            }
            dispatch(resetSubmitMessage())
            setNewMessage(false)
            setSelectedProject(null)
        }
    }, [submitMessageResponse])

    useEffect(() => {
        if (submitMessageError) {
            console.log("projects exist")
            toast.error(submitMessageError)
            if (selectedProject?.key) {
                dispatch(getProjectMessages(selectedProject?.key));
            }
            dispatch(resetSubmitMessage())
            setNewMessage(false)
            setSelectedId('')
            setSelectedProject(null)
        }
    }, [submitMessageError])

    //////////////////// Update message feedback & cleanup ////////////////////////

    useEffect(() => {

        if (updatedMessage) {
            toast.success("The notification has been updated.")
            dispatch(resetUpdateMessageResponse())
            dispatch(getProjectMessages(editMessageItem?.project_key))
            setEditMessageItem(null)
            setEditMessage(false)
        }

        if (updatedMessageError) {
            toast.error(updatedMessageError)
            dispatch(resetUpdateMessage())
            dispatch(getProjectMessages(editMessageItem?.project_key))
            setSelectedId('')
            setSelectedProject(null)
        }

    }, [updatedMessage, updatedMessageError])

    //////////////////// Delete message ////////////////////////

    const openDeleteMessage = (value) => {
        setMessageId(value)
        setMessageDelete(true)
    }

    const closeDeleteModal = () => {
        setMessageDelete(false)
        setMessageId('')
    }

    const confirmMessageDelete = () => {
        dispatch(deleteMessage(messageId))
    }

    //////////////////// Delete message feedback & cleanup ////////////////////////

    useEffect(() => {
        if (deletedMessage) {
            toast.success("The message has been deleted.")
            setMessageDelete(false)
            setMessageId('')
            dispatch(resetDeleteMessage())
        }

        if (deletedMessageError) {
            toast.error(deletedMessageError)
            setMessageDelete(false)
            setMessageId('')
            dispatch(resetDeleteMessage())
        }
    }, [deletedMessage, deletedMessageError])

    return (
        <div className='relative w-full h-full flex flex-col mx-auto rounded-lg'>

            <DeleteModal confirmationText={'Are you sure you want to delete this message?'} open={messageDelete} confirm={confirmMessageDelete} closeConfirm={closeDeleteModal} deleteProjectLoading={deletedMessageLoading} />

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

            <CreateNotification
                open={newMessage}
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

            <div className='w-full lg:w-10/12 flex flex-col py-4 mx-auto'>

                <PageHeader title={'Messages'} />

                <div className='w-full h-full flex flex-col md:flex-row'>

                    <div className='relative w-full md:w-1/2 flex flex-col'>

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

                    <div className={`w-full md:w-1/2 flex flex-row`}>

                        <Tooltip title={!selectedProject && "Select a project to create a notification."}>
                            <button disabled={!selectedProject} onClick={createNewMessage} className={`w-40 h-12 md:ml-auto px-3 mt-4 md:mt-6 rounded-lg border ${!selectedProject ? 'bg-slate-500' : 'bg-slate-950'} text-white align-middle`}>
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

                        {(!projectMessagesLoading && !projectMessages?.length) && <p className='font-semibold text-sm text-gray-500 mt-6'>There are no message for this project...</p>}

                    </div>

                }

            </div>

        </div>
    )
}

export default Notifications

{/*newMessage &&
    
*/}
