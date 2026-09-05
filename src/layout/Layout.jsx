import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Usables/Navbar'

function Layout() {
  return (
    <div>
        <Navbar />
        <Outlet></Outlet>
    </div>
  )
}

export default Layout