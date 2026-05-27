import { useState } from "react";
import "./App.css";
import Layout from "./layout/Layout";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import UserComplaint from "./pages/UserComplaint";
import LoginPage from "./pages/LoginPage";
import TicketHistory from "./pages/TicketHistory";
import TicketDetail from "./pages/TicketDetail";
import UserMaster from "./pages/admin/UserMaster";
import PendingTickets from "./pages/PendingTickets";
import { useAuth } from "./context/AuthContext";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import RemarksMaster from "./pages/admin/RemarksMaster";
import AdminProtectedRoutes from "./routes/AdminProtectedRoutes";
import Profile from "./pages/Profile";

function App() {
  const { adminUser, isAuthenticated } = useAuth();
  
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={ !isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
      <Route path="/user/complaint-form" element={ <UserComplaint />} />

      {/* Protected */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets/manage-tickets" element={<Tickets />} />
          <Route path="/tickets/tickets-history" element={<TicketHistory />} />
          <Route path="/tickets/ticket-detail" element={<TicketDetail />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route element={<AdminProtectedRoutes />}>
          <Route path="/tickets/inprocess-tickets" element={<PendingTickets />} />
          <Route path="/user/manage-user" element={<UserMaster />} />
          <Route path="/query/manage-query" element={<RemarksMaster />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
