import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex flex-col h-screen justify-center items-center gap-5'>
      <h1 className='text-8xl font-medium'>Error 404</h1>
      <p className='text-4xl'>Page Not Found</p>
      <Link to={'/'} className='text-lg btn btn-sm gap-2'>Go Back</Link>
    </div>
  )
}

export default NotFound