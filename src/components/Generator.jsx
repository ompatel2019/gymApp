import React from 'react'
import GeneratorSubheadings from './GeneratorSubheadings'
import { WORKOUTS } from '../utils/workouts'

const Generator = () => {
  const poison = [
    'Individual', 'Bro Split', 'Bodybuilder Split', 'Upper Lower'
  ]
  return (
    <div className='responsivePad flex flex-col items-center py-24 justify-center space-y-8'>

      <div className='space-y-8'>
        <GeneratorSubheadings 
          number={'01'} 
          heading={'Choose Your Challenge'} 
          subheading={'Pick the workout that pushes your limits.'} 
        />

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
          {Object.keys(WORKOUTS).map((type, typeIndex) => {
            return (
              <button className='p-6 border-2 bg-slate-950 border-blue-400 rounded-lg text-white p' key={typeIndex}>
                <p className='capitalize'>{
                  type.replaceAll('_', " ")}
                </p>
              </button>
            )
          })}
        </div>

      </div>

      <div>
        <GeneratorSubheadings 
          number={'02'} 
          heading={'Target Your Muscles'} 
          subheading={'Select the muscle groups to train and sculpt.'} 
        />
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