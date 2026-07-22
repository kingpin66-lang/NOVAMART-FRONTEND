import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

function FrontendLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default FrontendLayout
