import React, { useEffect, useState } from 'react'

//////////////---Headless ui imports---////////////////////
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

//////////////---Icon imports---////////////////////
import CloseIcon from '@mui/icons-material/Close';

//////////////---Nanoid imports---////////////////////
import { nanoid } from 'nanoid';

//////////////---Yup imports---////////////////////
import * as Yup from 'yup';

//////////////---Formik imports---////////////////////
import { useFormik } from 'formik';

//////////////---Redux imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---MUI imports---////////////////////
import { CircularProgress, Tooltip } from '@mui/material';

//////////////---Input imports---////////////////////
import SimpleInput from '../../Inputs/SimpleInput';
import TextAreaInput from '../../Inputs/TextAreaInput';

//////////////---API imports---////////////////////
import { createProject, resetCreateProject } from '../../../Pages/Slices/CreateProject';



const ProjectDialog = ({ open, closeModal, userId }) => {

  const dispatch = useDispatch()

  const { createProjectResponse, createProjectLoading, createProjectError } = useSelector((state) => state.createproject);

  let validation = Yup.object().shape({
    title: Yup.string().required('Please enter a project name').typeError(),
    description: Yup.string().required('Please enter a project description').typeError(),
  })

  const createProjectFormik = useFormik({

    enableReinitialize: true,
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: validation,
    onSubmit: values => {
      let projectData = {
        user_id: userId,
        key: nanoid(14),
        title: values.title,
        created_at: new Date(),
        description: values.description,
        message_count: 0
      }

      console.log("create project")

      dispatch(createProject(projectData))
    }
  })

  const closeCreateProject = () => {
    closeModal()
    createProjectFormik?.handleReset()
  }

  useEffect(() => {
    if (createProjectResponse) {
      createProjectFormik?.handleReset()
    }

    if (createProjectError) {
      createProjectFormik?.handleReset()
    }
  }, [createProjectResponse, createProjectError])

  return (
    <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={() => { }}>
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full sm:w-96 flex flex-col rounded-lg shadow-xl p-6 border backdrop-blur-2xl bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className='w-full h-9 flex flex-col'>
              <DialogTitle as="h3" className="text-base/7 font-medium text-gray-950">
                Create a project
              </DialogTitle>
              <button type='button' disabled={createProjectLoading} onClick={closeCreateProject} className='absolute w-10 h-6 p1 right-4'>
                <CloseIcon />
              </button>
            </div>

            <form className='relative w-full mt-[10%] flex flex-grow flex-col space-y-2 mx-auto p-1' onSubmit={createProjectFormik?.handleSubmit}>

              <SimpleInput
                label={'Title'}
                type={'text'}
                placeholder={'Enter the project name'}
                name={'title'}
                value={createProjectFormik?.values.title}
                onChange={createProjectFormik?.handleChange('title')}
                touched={createProjectFormik?.touched.title}
                error={(createProjectFormik?.touched.title && createProjectFormik?.errors.title) && createProjectFormik?.errors.title}
              />

              <TextAreaInput
                label={'Description'}
                placeholder={'Enter the project description'}
                name={'description'}
                value={createProjectFormik?.values.description}
                onChange={createProjectFormik?.handleChange('description')}
                touched={createProjectFormik.touched.description}
                error={(createProjectFormik.touched.description && createProjectFormik.errors.description) && createProjectFormik.errors.description}
              />

              <div className='relative w-full'>
                <button disabled={createProjectError || createProjectLoading} className={`relative w-1/2 h-14 mt-8 text-center ml-[25%] rounded ${createProjectError ? 'bg-gray-500' : 'bg-gray-900'} cursor-pointer text-white`} type='submit'>{createProjectLoading ? <CircularProgress size={20} color='#ffffff' /> : 'Create Project'}</button>
              </div>

            </form>

          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ProjectDialog