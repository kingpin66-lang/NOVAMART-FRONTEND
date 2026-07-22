import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectRoutes({ children }) {
    const token = sessionStorage.getItem("token")
    const User = JSON.parse(sessionStorage.getItem("user"))
    if (!token) {
        return <Navigate to="/login" />;
    }

    if (User?.role !== "admin") {
        return <Navigate to="/" />;
    }

    return children
}


export default ProtectRoutes
