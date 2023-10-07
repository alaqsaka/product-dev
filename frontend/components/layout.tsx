import React, { useEffect, useState } from 'react'
import Navbar from './navbar'

const Layout = ({children}: {children: React.ReactNode}) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const isTokenExist = localStorage.getItem('token');

   if (isTokenExist) {
    setToken(isTokenExist);
   }
  }, [])


  return (
    <>
    <Navbar token={token}/>
    <main>{children}</main>
  </>
  )
}

export default Layout
