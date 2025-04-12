import React from 'react'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      Dashboard
      <Outlet />
    </div>
  )
}

export default DashboardLayout