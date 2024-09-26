import React, { useState } from 'react'
import GeneratorSubheadings from './GeneratorSubheadings'
import { WORKOUTS } from '../utils/workouts'

const Generator = () => {
  const regularClass = 'bg-slate-950 p-6 p bg-slate-950 border-2'
  const showModalClass = 'rounded-t-lg border-b-0'
  const [showModal, setShowModal] = useState(false)
  const [challenge, setChallenge] = useState('');
  return (
    <div className='responsivePad flex flex-col items-center py-24 justify-center space-y-12'>

      <div className='space-y-8'>
        <GeneratorSubheadings 
          number={'01'} 
          heading={'Choose Your Challenge'} 
          subheading={'Pick the workout that pushes your limits.'} 
        />

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 '>
          {Object.keys(WORKOUTS).map((type, typeIndex) => {
            return (
              <button onClick={() => {{setChallenge(type)} console.log(challenge)}} className={`${regularClass} hover:bg-white hover:border-black hover:text-black transition-all ease-in-out duration-500 rounded-lg`} key={typeIndex}>
                <p className='capitalize'>{
                  type.replaceAll('_', " ")}
                </p>
              </button>
            )
          })}
        </div>

      </div>

      <div className='w-[72.5%] space-y-8'>
        <GeneratorSubheadings 
          number={'02'} 
          heading={'Target Your Muscles'} 
          subheading={'Select the muscle groups to train and sculpt.'} 
        />
        <div>

        <div className={`${regularClass} flex items-center justify-between ${ showModal ? showModalClass : 'rounded-lg'}`}>
            <p>Select muscle groups</p>
            {!showModal &&
            <button onClick={() => {setShowModal(prev => !prev)}}><i className="fa-solid fa-circle-arrow-down"></i></button>
              }
              
            {showModal && <button onClick={() => {setShowModal(prev => !prev)}}>
              <i className="fa-solid fa-circle-arrow-up"></i>
            </button>
            }
          </div>

          {showModal && 
            <div className='bg-slate-950 flex flex-col gap-4 w-full text-center justify-center items-center rounded-b-lg border-b-2 border-x-2'>
                <p className='p-4 border-y-2 w-full text-center'>Bicep</p>
                <p className='p-4 border-b-2 w-full text-center'>Tricep</p>
                <p className='p-4 border-b-2 w-full text-center'>Back</p>
                <p className='p-4 border-b-2 w-full text-center'>Glutes</p>
                <p className='p-4 w-full text-center'>Calves</p>
            </div>
          }




        </div>

      </div>

      <div>
        <GeneratorSubheadings 
          number={'03'} 
          heading={'Set Your Goal'} 
          subheading={'Define your ultimate fitness objective.'} 
        />

      </div>


    </div>
  )
}

export default Generator