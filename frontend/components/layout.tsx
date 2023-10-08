import React, { useEffect, useState } from 'react'
import Navbar from './navbar'

const Layout = ({children}: {children: React.ReactNode}) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    console.log('layout ');
    const isTokenExist = localStorage.getItem('token');

   if (isTokenExist) {
    setToken(isTokenExist);
   }
  }, [children]);


  return (
    <>
    <Navbar token={token}/>
    <main>{children}</main>
  </>
  )
}

export default Layout
