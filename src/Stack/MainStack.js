import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../Components/LayoutElements/Layout'
import AppRoutes from '../Routes/Routes'



const MainStack = () => {
  return (
    <Routes>
        <Layout>
            <AppRoutes />
        </Layout>
    </Routes>
  )
}

export default MainStack