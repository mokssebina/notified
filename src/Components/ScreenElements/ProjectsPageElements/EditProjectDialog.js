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
import { editProject, resetEditProject } from '../../../Pages/Slices/EditProject';




const EditProjectDialog = ({ open, closeModal, userId, editData }) => {

    const dispatch = useDispatch()

  const { editProjectResponse, editProjectLoading, editProjectError } = useSelector((state) => state.editproject);

  let validation = Yup.object().shape({
    title: Yup.string().required('Please enter a project name').typeError(),
    description: Yup.string().required('Please enter a project description').typeError(),
  })

  const editProjectFormik = useFormik({

    enableReinitialize: true,
    initialValues: {
      title: editData?.title,
      description: editData?.description
    },
    validationSchema: validation,
    onSubmit: values => {
      let projectData = {
        id: editData?.id,
        title: values.title,
        description: values.description,
      }

      console.log("edit project request body: ",projectData)

      dispatch(editProject(projectData))
    }
  })

  const closeEditProject = () => {
    closeModal()
    editProjectFormik?.handleReset()
  }

  useEffect(() => {
    if (editProjectResponse) {
      editProjectFormik?.handleReset()
    }

    if (editProjectError) {
      editProjectFormik?.handleReset()
    }
  }, [editProjectResponse, editProjectError])

  return (
    <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={() => { }}>
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w0full sm:w-96 flex flex-col rounded-lg shadow-xl p-6 border backdrop-blur-2xl bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className='w-full h-9 flex flex-col'>
              <DialogTitle as="h3" className="text-base/7 font-medium text-gray-950">
                Edit your project
              </DialogTitle>
              <button type='button' disabled={editProjectLoading} onClick={closeEditProject} className='absolute w-10 h-6 p1 right-4'>
                <CloseIcon />
              </button>
            </div>

            <form className='relative w-full mt-[10%] flex flex-grow flex-col space-y-2 mx-auto p-1' onSubmit={editProjectFormik?.handleSubmit}>

              <SimpleInput
                label={'Title'}
                type={'text'}
                placeholder={'Enter the project name'}
                name={'title'}
                value={editProjectFormik?.values.title}
                onChange={editProjectFormik?.handleChange('title')}
                touched={editProjectFormik?.touched.title}
                error={(editProjectFormik?.touched.title && editProjectFormik?.errors.title) && editProjectFormik?.errors.title}
              />

              <TextAreaInput
                label={'Description'}
                placeholder={'Enter the project description'}
                name={'description'}
                value={editProjectFormik?.values.description}
                onChange={editProjectFormik?.handleChange('description')}
                touched={editProjectFormik.touched.description}
                error={(editProjectFormik.touched.description && editProjectFormik.errors.description) && editProjectFormik.errors.description}
              />

              <div className='relative w-full'>
                <button disabled={editProjectError || editProjectLoading} className={`relative w-1/2 h-14 mt-8 text-center ml-[25%] rounded ${editProjectError ? 'bg-gray-500' : 'bg-gray-900'} cursor-pointer text-white`} type='submit'>{editProjectLoading ? <CircularProgress size={20} color='#ffffff' /> : 'Edit Project'}</button>
              </div>

            </form>

          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default EditProjectDialog