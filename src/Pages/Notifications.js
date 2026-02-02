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

//////////////---Toast imports---////////////////////
import { useAuth } from '../Context/AuthContext';

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
import { updateProfileCredits } from './Slices/UpdateProfileCredits';
import { updateProject } from './Slices/UpdateProject';



const Notifications = () => {

    const dispatch = useDispatch()
    const location = useLocation()

    const { session, projectNumber, messages } = useAuth()

    const { projects, getProjectsLoading, getProjectsError } = useSelector((state) => state.getprojects);
    const { projectMessages, projectMessagesLoading, projectMessagesError } = useSelector((state) => state.getprojectmessages);
    const { submitMessageResponse, submitMessageLoading, submitMessageError } = useSelector((state) => state.submitmessage);
    const { updatedMessage, updatedMessageLoading, updatedMessageError } = useSelector((state) => state.updateprojectmessage);
    const { deletedMessage, deletedMessageLoading, deletedMessageError } = useSelector((state) => state.deletemessage);
    const { userProfile, profileLoading, profileError } = useSelector((state) => state.getuserprofile);

    const [selectedId, setSelectedId] = useState('')
    const [selectedProject, setSelectedProject] = useState(null)
    const [enabled, setEnabled] = useState(true)
    const [newMessage, setNewMessage] = useState(false)
    const [editMessage, setEditMessage] = useState(false)
    const [editMessageItem, setEditMessageItem] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState('#14161a')
    const [textColor, setTextColor] = useState('#fafafa')
    const [borderColor, setBorderColor] = useState('#f97015')
    const [messageDelete, setMessageDelete] = useState(false)
    const [messageId, setMessageId] = useState('')
    const [filteredProjects, setFilteredProjects] = useState()

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
        const selected = filteredProjects.find((item) => item.id.toString() === event.target.value);
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
        console.log("clicked")
        setNewMessage(true)
    }

    const openEditMessage = (value) => {
        console.log("edit message: ", value)
        setEditMessage(true)
        setEditMessageItem(value)
        setEnabled(value?.is_active)
        setBackgroundColor(value?.backgroundColor)
        setTextColor(value?.textColor)
        setBorderColor(value?.borderColor)
    }

    const closeCreate = () => {
        setNewMessage(false)
        setBackgroundColor('#14161a')
        setTextColor('#fafafa')
        setBorderColor('#f97015')
        //setSelectedId('')
        //setSelectedProject(null)
        //dispatch(resetGetProjectMessages())
    }

    const closeEdit = () => {
        console.log("console log: ", 'closed')
        setEditMessage(false)
        //setSelectedId('')
        //setSelectedProject(null)
        setEditMessageItem(null)
        setBackgroundColor('#14161a')
        setTextColor('#fafafa')
        setBorderColor('#f97015')
        //dispatch(resetGetProjectMessages())
    }

    //////////////////// Filter projects ////////////////////////

    useEffect(() => {
        if (projects) {
            console.log("loaded projects: ", projects)
            setFilteredProjects(projects?.map((project, index) => (
                index < projectNumber ? { ...project, filtered_project: "filtered" } : project
            )))

            console.log("filtered: ", filteredProjects)
        }
    }, [projects])

    //////////////////// Create message feedback & cleanup ////////////////////////

    useEffect(() => {
        if (submitMessageResponse?.length) {
            toast.success("The notification has been created.")
            console.log("selected project key: ",selectedProject?.key)
            dispatch(getProjectMessages(selectedProject?.key))
            dispatch(resetSubmitMessage())
            setNewMessage(false)
            setSelectedProject(null)
            dispatch(updateProfileCredits({
                credits: userProfile?.credits - 5,
                userId: session.user?.id
            }))
        }

        if (submitMessageError) {
            console.log("projects exist")
            toast.error(submitMessageError)
            if (selectedProject?.key) {
                console.log("selected project: ",selectedProject?.key)
                dispatch(getProjectMessages(selectedProject?.key));
            }
            dispatch(resetSubmitMessage())
            setNewMessage(false)
            setSelectedId('')
            setSelectedProject(null)
        }

    }, [submitMessageResponse, submitMessageError])

    //////////////////// Update message feedback & cleanup ////////////////////////

    useEffect(() => {

        if (updatedMessage?.length) {
            toast.success("The notification has been updated.")
            dispatch(resetUpdateMessageResponse())
            dispatch(getProjectMessages(editMessageItem?.project_key))
            setEditMessageItem(null)
            setEditMessage(false)
            dispatch(updateProfileCredits({
                credits: userProfile?.credits - 5,
                userId: session.user?.id
            }))
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
            dispatch(getProjectMessages(selectedProject?.key))
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

    const createButton = () => {
        if (userProfile?.credits > 0) {
            return false
        } else {
            return true
        }
    }


    return (
        <div className='relative w-full h-full flex flex-col mx-auto rounded-lg'>

            <DeleteModal
                confirmationText={'Are you sure you want to delete this message?'}
                open={messageDelete} confirm={confirmMessageDelete}
                closeConfirm={closeDeleteModal}
                deleteProjectLoading={deletedMessageLoading}
            />

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
                borderColor={borderColor}
                setBorderColor={setBorderColor}
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
                borderColor={borderColor}
                setBorderColor={setBorderColor}
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

                        {selectedProject &&
                            <Tooltip title={userProfile?.credits === 0 && 'You are out of credits. You need to purchase more to create new messages.'}>
                                <button
                                    disabled={userProfile?.credits ? false : true}
                                    onClick={createNewMessage}
                                    className={`w-40 h-12 md:ml-auto px-3 mt-4 md:mt-6 rounded-lg border border-foreground ${userProfile?.credits > 0 ? 'bg-primary' : 'bg-primary/50'} text-foreground align-middle`}>
                                    <div className='flex flex-row space-x-2 align-middle'>
                                        <Add />
                                        <p>Create New</p>
                                    </div>
                                </button>
                            </Tooltip>
                        }

                    </div>

                </div>

            </div>

            <div className='w-full h-page lg:w-10/12 mt-12 mx-auto overflow-y-auto pr-3'>

                {selectedProject &&

                    <>

                        {projectMessagesLoading && <NotificationLoaderItem />}

                        {(!projectMessagesLoading && projectMessages?.length > 0) &&
                            <>
                                {projectMessages?.slice()
                                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((item) => (
                                        <NotificationItem key={item?.id} title={item?.title} projectKey={item?.project_key} content={item?.content}
                                            enabled={item?.is_active} position={item?.position} route={item?.route} type={item?.type}
                                            editMessage={userProfile?.credits > 0 ? () => openEditMessage(item) : null}
                                            deleteMessage={() => openDeleteMessage(item?.id)} filtered={userProfile?.credits > 0}
                                        />
                                    ))}
                            </>
                        }

                        {(!projectMessagesLoading && !projectMessages?.length) && <p className='font-semibold text-sm text-gray-500 mt-6'>There are no message for this project...</p>}

                    </>

                }

            </div>

        </div>
    )
}

export default Notifications