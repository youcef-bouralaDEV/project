import React, { useState } from 'react'

export default function Loading(loading) {

  
  return (
    <div className='h-full'>
    {loading && (
        <div className="flex justify-center items-centre gap-2">
            <div className="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
            <div className="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
            <div className="w-5 h-5 rounded-full animate-pulse bg-orange-600"></div>
        </div>
    )}
</div>
  )
}
