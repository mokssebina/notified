import { configureStore } from '@reduxjs/toolkit'
import SubmitMessageSlice from '../Pages/Slices/SubmitMessageSlice';
import GetMessagesSlice from '../Pages/Slices/GetMessagesSlice';
import UpdateMessageSlice from '../Pages/Slices/UpdateMessageSlice';
import DeleteMessageSlice from '../Pages/Slices/DeleteMessageSlice';
import GetUserProfile from '../Pages/Slices/GetUserProfile';
import CreateProject from '../Pages/Slices/CreateProject';
import UpdateProject from '../Pages/Slices/UpdateProject';
import GetProjects from '../Pages/Slices/GetProjects';
import EditProject from '../Pages/Slices/EditProject';
import DeleteProject from '../Pages/Slices/DeleteProject';
import SignInSlice from '../Pages/Slices/SignInSlice';
import ProfileUpdate from '../Pages/Slices/ProfileUpdate';
import EditProfileUpdate from '../Pages/Slices/EditProfileUpdate';
import SignUpUserSlice from '../AuthPages/SignupSlice/SignUpUserSlice';
import SignUpOauthSlice from '../AuthPages/SignupSlice/SignUpOauthSlice';


export const store = configureStore({
  reducer: {
    submitmessage: SubmitMessageSlice,
    updateprojectmessage: UpdateMessageSlice,
    getprojectmessages: GetMessagesSlice,
    updatemessage: UpdateMessageSlice,
    deletemessage: DeleteMessageSlice,
    getuserprofile: GetUserProfile,
    updateprofile: ProfileUpdate,
    editprofile: EditProfileUpdate,
    createproject: CreateProject,
    updateproject: UpdateProject,
    getprojects: GetProjects,
    editproject: EditProject,
    deleteproject: DeleteProject,
    signin: SignInSlice,
    signup: SignUpUserSlice,
    signupoauth: SignUpOauthSlice
  },
})