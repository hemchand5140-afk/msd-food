import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import LoadingSpinner from './LoadingSpinner.jsx'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return user ? children : <Navigate to="/login" />
}

export default ProtectedRoute