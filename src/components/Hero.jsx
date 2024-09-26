import React from 'react'

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center responsivePad min-h-screen space-y-4">
      <p className="font-bold p">IT'S TIME TO GET</p>

      <h1 className="h1 font-bold text-blue-500">MASSIVE</h1>

      <div className='flex flex-col items-center space-y-6 2xl:space-y-8'>
        <p className="text-center h7 font-normal">I acknowledge the potential risks associated with significant muscle growth, including body dysmorphia and challenges with everyday mobility.</p>
        <button className='Button'>
          Start the journey
        </button>
      </div>
    </div>
  )
}

export default Hero