import { useState } from 'react'
import './App.css'
import Layout from './layout/Layout'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import UserComplaint from './pages/UserComplaint'
import LoginPage from './pages/LoginPage'
import TicketHistory from './pages/TicketHistory'
import TicketDetail from './pages/TicketDetail'
import UserMaster from './pages/admin/UserMaster'
import PendingTickets from './pages/PendingTickets'

function App() {

  return (
    <>
      {/* <Router> */}
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Navigate to="/dashboard" />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/tickets/manage-tickets' element={<Tickets />} />
            <Route path='/tickets/pending-tickets' element={<PendingTickets />} />
            <Route path='/tickets/tickets-history' element={<TicketHistory />} />
            <Route path='/tickets/ticket-detail' element={<TicketDetail />} />
            <Route path='/User/manage-user' element={<UserMaster />} />

            {/* Public  */}
          </Route>
          <Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/user/complaint-form' element={<UserComplaint />} />
          </Route>
        </Routes>
      {/* </Router> */}
    </>
  )
}

export default App
