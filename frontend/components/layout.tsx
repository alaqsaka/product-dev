import React from 'react'
import Navbar from './navbar'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <Navbar />
    <main>{children}</main>
  </>
  )
}

export default Layout
