import { Outlet, Route, Navigate } from "react-router-dom";


export const PublicRoutes = ({ authUser }) => {
    return authUser ? <Navigate to={'/projects'} /> : <Outlet />
}