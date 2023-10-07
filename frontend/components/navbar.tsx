import React from 'react'
import Button from './button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='border-b py-[10px] px-[16px] md:py-[14px] md:px-[80px] flex justify-between items-center'>
      <div className='text-lg font-bold'>
        Simple<span style={{ color: '#DD2590' }}>.</span>Repo
      </div>

      <Link href={'http://localhost:3000/api/github/auth'}>
        <Button variant='primary'>
          Login with Github
        </Button>
      </Link>
    </div>
  )
}

export default Navbar
