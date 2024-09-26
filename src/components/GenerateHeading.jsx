import React from 'react'

const GenerateHeading = () => {
    const string = 'It\'s time to lock-in'
  return (
    <div className='responsivePad bg-[#020618] flex flex-col items-center min-h-[240px] justify-center space-y-2'>
        <h5 className='h5 font-bold'>Generate Your Workout</h5>
        <h2 className='h2 font-bold'>{string.toUpperCase()}</h2>
    </div>
  )
}

export default GenerateHeading