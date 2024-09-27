import React from 'react'
import Hero from './components/Hero'
import GenerateHeading from './components/GenerateHeading'
import Generator from './components/Generator'
import Workout from './components/Workout'
import Footer from './components/Footer'

const App = () => {
  return (
    <main className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
        <Hero/>
        <GenerateHeading/>
        <Generator/>
        <Workout/> 

        {/* 
        <Footer/>
        */}
    </main>
  )
}

export default App