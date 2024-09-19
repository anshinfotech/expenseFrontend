import React from 'react'

function PageNotFound() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div className="flex gap-4 items-center">
        <i className='fa-solid fa-circle-exclamation text-6xl'></i>
        <h1 className='text-4xl font-medium'>404 Page Not Found</h1>
      </div>
    </div>
  )
}

export default PageNotFound
