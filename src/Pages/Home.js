import React, { useState, useEffect } from 'react'

//////////////---Routing imports---////////////////////
import { useLocation } from 'react-router-dom';

//////////////---Redux imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast';

//////////////---Material UI imports---////////////////////
import { Add, Refresh } from '@mui/icons-material'

//////////////---Context imports---////////////////////
import { useAuth } from '../Context/AuthContext';

//////////////---Clipboard imports---////////////////////
import clipboard from 'clipboardy';

//////////////---Screen imports---////////////////////
import PageHeader from '../Components/LayoutElements/PageHeader';
import ProjectItem from '../Components/ScreenElements/ProjectsPageElements/ProjectItem'
import ProjectDialog from '../Components/ScreenElements/ProjectsPageElements/ProjectDialog'
import EditProjectDialog from '../Components/ScreenElements/ProjectsPageElements/EditProjectDialog';
import DeleteModal from '../Components/ScreenElements/ProjectsPageElements/DeleteModal';
import ProjectItemLoader from '../Components/ScreenElements/ProjectsPageElements/ProjectItemLoader';


//////////////---API imports---////////////////////
import { resetCreateProject } from './Slices/CreateProject'
import { resetEditProject } from './Slices/EditProject';
import { getProjects } from './Slices/GetProjects';
import { deleteProject, resetDeleteProject } from './Slices/DeleteProject';
import cactusgif from '../Assets/images/cactus.gif'


const Home = () => {

  ////////////////////// Hooks ///////////////////////////

  const dispatch = useDispatch()
  const location = useLocation()
  const { session } = useAuth()

  ////////////////////// Redux State ///////////////////////////

  const { projects, getProjectsLoading, getProjectsError } = useSelector((state) => state.getprojects);
  const { createProjectResponse, createProjectLoading, createProjectError } = useSelector((state) => state.createproject);
  const { editProjectResponse, editProjectLoading, editProjectError } = useSelector((state) => state.editproject);
  const { deleteProjectData, deleteProjectLoading, deleteProjectError } = useSelector((state) => state.deleteproject);


  ////////////////////// State ///////////////////////////

  const [newProjectOpen, setNewProjectOpen] = useState(false)
  const [editProjectOpen, setEditProjectOpen] = useState(false)
  const [editProject, setEditProject] = useState(null)
  const [projectItem, setProjectItem] = useState(false)
  const [projectDelete, setProjectDelete] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  ////////////////////// Create, Edit & Delete modal open/close ///////////////////////////

  const createNew = () => {
    setNewProjectOpen(true)
  }

  const closeNewModal = () => {
    setNewProjectOpen(false)
  }

  const openEditModal = (value) => {
    console.log("edit project value: ", value)
    setEditProjectOpen(true)
    setEditProject(value)
    console.log("selected edit project: ", editProject)
  }

  const closeEditModal = () => {
    setProjectItem(false)
    setEditProject()
    setEditProjectOpen(false)
  }

  const deleteProjectModal = (value) => {
    setDeleteId(value)
    setProjectDelete(true)
  }

  const closeDeleteModal = () => {
    setDeleteId('')
    setProjectDelete(false)
  }

  const confirmProjectDelete = () => {
    dispatch(deleteProject(deleteId))
  }

  const refreshProjects = () => {
    dispatch(getProjects(session?.user.id))
  }

  const copyProjectKey = (value) => {
    console.log("project Id: ", value)
    clipboard.write(value)
    toast.success('Copied!')
  }

  //////////////////////// Get path name ////////////////////////////

  useEffect(() => {
    if (location.pathname) {
      console.log("app path: ", location.pathname)
    }
  }, [location])

  ////////////////////// Data retreival ///////////////////////////

  useEffect(() => {
    if (!projects) {
      dispatch(getProjects(session?.user.id))
    }
  }, [])

  ////////////////////// Create project success cleanup ///////////////////////////

  useEffect(() => {
    if (createProjectResponse) {
      closeNewModal()
      dispatch(resetCreateProject())
      toast.success('You have successfully created a new project!')
      dispatch(getProjects(session?.user.id))
    }

    if (createProjectError) {
      closeNewModal()
      dispatch(resetCreateProject())
      toast.error(createProjectError)
    }
  }, [createProjectResponse, createProjectError])

  ////////////////////// Edit project success cleanup ///////////////////////////

  useEffect(() => {
    if (editProjectResponse) {
      closeEditModal()
      dispatch(resetEditProject())
      toast.success('You have successfully edited your project.')
      dispatch(getProjects(session?.user.id))
    }
  }, [editProjectResponse])

  useEffect(() => {
    if (editProjectError) {
      closeEditModal()
      toast.error(editProjectError)
      dispatch(resetEditProject())
    }
  }, [editProjectError])

  ////////////////////// Delete project success cleanup ///////////////////////////

  useEffect(() => {
    if (deleteProjectData) {
      closeDeleteModal()
      dispatch(resetDeleteProject())
      toast.success('Your project has been deleted.')
      dispatch(getProjects(session?.user.id))
    }
  }, [deleteProjectData])

  useEffect(() => {
    if (deleteProjectError) {
      closeDeleteModal()
      toast.error(deleteProjectError)
      dispatch(resetDeleteProject())
    }
  }, [deleteProjectError])


  return (
    <>
      {/*
        <div style={{
          position: 'absolute',
          top: undefined,
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          width: '50%',
          padding: '1rem', // p-4 = 1rem
          backgroundColor: '#e1e1e1',
          border: `1px solid #000000`, // Completed border style
        }}></div>
        */}
      <ProjectDialog open={newProjectOpen} closeModal={closeNewModal} userId={session?.user.id} />
      <EditProjectDialog open={editProjectOpen} closeModal={closeEditModal} userId={session?.user.id} editData={editProject} />
      <DeleteModal confirmationText={'Are you sure you want to delete this project?'} open={projectDelete} confirm={confirmProjectDelete} closeConfirm={closeDeleteModal} deleteProjectLoading={deleteProjectLoading} />
      <div style={{scrollbarWidth: 'none'}} className='relative w-full h-full flex flex-col'>

        <div className='w-full lg:w-10/12 flex flex-col py-4 mx-auto'>

          <PageHeader title={'Projects'} />

          <div className='w-full h-12 flex flex-row mx-auto'>

            <button onClick={createNew} className='h-12 py-3 px-3 rounded-lg bg-primary text-foreground border border-foreground align-middle'>
              <div className='flex flex-row space-x-2 align-middle'>
                <Add />
                <p>New Project</p>
              </div>
            </button>

            <button onClick={refreshProjects} className='relative h-12 py-3 px-3 ml-auto rounded-lg border border-primary text-primary align-middle'>
              <div className='flex flex-row space-x-2 align-middle'>
                <Refresh />
                <p>Refresh</p>
              </div>
            </button>

          </div>

          <div className='w-full mt-12'>

            {getProjectsLoading && <ProjectItemLoader />}

            {!getProjectsLoading && projects?.slice()
              .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((project) => (
                <ProjectItem key={project?.id} projectName={project?.title} projectKey={project?.key}
                  description={project?.description} number={project?.message_count} copyText={() => copyProjectKey(project?.key)}
                  editProject={() => openEditModal(project)} deleteProject={() => deleteProjectModal(project?.id)}
                />
              ))}

            {!getProjectsLoading && projects?.length == 0 &&
              <div className='w-full mt-12 md:mt-24'>
                <p className='font-semibold text-base text-foreground text-center'>You haven't created any projects yet...</p>
                <div className='w-full h-auto md:w-2/5 mx-auto'>
                  <img alt="desert-cactus" className='w-full aspect-auto' src={cactusgif} />
                </div>
              </div>
            }

          </div>

        </div>

      </div>
    </>
  )
}

export default Home