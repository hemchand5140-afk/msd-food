import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      localStorage.setItem('token', token)
    } else {
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
  }

  const register = async (userData) => {
    try {
      setError('')
      const response = await axios.post('/api/auth/register', userData)
      const { token, user } = response.data
      
      setAuthToken(token)
      setUser(user)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      setError(message)
      return { success: false, message }
    }
  }

  const login = async (credentials) => {
    try {
      setError('')
      const response = await axios.post('/api/auth/login', credentials)
      const { token, user } = response.data
      
      setAuthToken(token)
      setUser(user)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      setError(message)
      return { success: false, message }
    }
  }

  const logout = () => {
    setAuthToken(null)
    setUser(null)
  }

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        setAuthToken(token)
        const response = await axios.get('/api/auth/me')
        setUser(response.data.user)
      }
    } catch (error) {
      console.error('Get current user error:', error)
      setAuthToken(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  const value = {
    user,
    loading,
    error,
    setError,
    register,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}