import React, { useEffect, useState } from 'react';
import {generateWorkout} from '../utils/functions';
import { SCHEMES, WORKOUTS, TEMPOS } from '../utils/workouts';

const Workout = ({ generateWorkoutParams }) => {
  const [workout, setWorkout] = useState([]);
  const [counters, setCounters] = useState([]);
  const [completeSets, setCompleteSets] = useState([]);
  const [showDescs, setShowDescs] = useState([]);

  useEffect(() => {
    if (generateWorkoutParams && generateWorkoutParams.poison && generateWorkoutParams.goal && generateWorkoutParams.muscles.length > 0) {
      const workoutArgs = {
        muscles: generateWorkoutParams.muscles,
        poison: generateWorkoutParams.poison,
        goal: generateWorkoutParams.goal,
      };
      const newWorkout = generateWorkout(workoutArgs);
      setWorkout(newWorkout);
      setCounters(new Array(newWorkout.length).fill(0));
      setCompleteSets(new Array(newWorkout.length).fill(false));
      setShowDescs(new Array(newWorkout.length).fill(false));
    }
  }, [generateWorkoutParams]);

  const increment = (index) => {
    setCounters(counters.map((count, idx) => idx === index ? (count === 2 ? 0 : count + 1) : count));
    setCompleteSets(completeSets.map((set, idx) => idx === index ? (counters[index] === 2) : set));
  };

  const toggleDescription = (index) => {
    setShowDescs(showDescs.map((show, idx) => idx === index ? !show : show));
  };

  const formatName = (name) => {
    return name.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div id='workout' className='responsivePad py-8 flex flex-col space-y-4'>
      <div className='space-y-4 p'>
        <p><span className='text-blue-400 font-bold'>**Note</span> - 'Reps' refers to the number of repetitions, 'rest' is measured in seconds, and 'tempo' describes the duration of each phase of movement, structured as eccentric (lowering) - isometric (pause) - concentric (lifting).</p>
        <p>Select a weight that enables you to perform the prescribed repetitions while maintaining proper technique.</p>
        <p>Enjoy your workout!</p>
      </div>

      <div className='flex flex-col space-y-8'>
        {workout.map((workoutItem, index) => (
          <div key={index} className='bg-slate-950 rounded-lg p-4 space-y-4'>
            <div className='flex justify-between items-center '>
              <p className='h5 font-bold text-[#91a2b7]'>{`0${index + 1}`}</p>
              <p className='h7 font-semibold capitalize'>{formatName(workoutItem.name)}</p>
              <p className='text-gray-400 capitalize'>{workoutItem.type}</p>
            </div>
  
            <div className=''>
              <p className='font-light text-[#91a2b7]'>Muscle groups</p>
              <p className='font-bold capitalize'>{workoutItem.muscles.join(', ')}</p>
            </div>
  
            <div className='grid grid-cols-4 max-md:grid-cols-2 gap-2'>
              <div className='border-2 border-gray-500 p-2 w-full rounded-md'>
                <p className='font-light text-[#91a2b7]'>Reps</p>
                <p className='font-bold'>{workoutItem.reps}</p>
              </div>
              
              <div className='border-2 border-gray-500 p-2 w-full rounded-md'>
                <p className='font-light text-[#91a2b7]'>Rest (Click to start)</p>
                <p className='font-bold'>{workoutItem.rest}</p>
              </div>
  
              <div className='border-2 border-gray-500 p-2 w-full rounded-md'>
                <p className='font-light text-[#91a2b7]'>Tempo</p>
                <p className='font-bold'>{workoutItem.tempo}</p>
              </div>
  
              <div className='border-2 p-2 w-full rounded-md border-blue-500 hover:border-white transition-all ease-in-out'>
                {!completeSets[index] && 
                <p className='font-light text-[#91a2b7] cursor-pointer'>Sets Completed</p>
                }
  
                {completeSets[index] &&
                <div className='flex space-x-2 items-center'>
                  <p className='font-bold cursor-pointer'>Set Completed!</p>
                  <i className="fa-regular fa-face-smile"></i>
                </div>
                }
                <p onClick={() => increment(index)} className='font-bold'>{`${counters[index]} / 3`}</p>
              </div>
            </div>
  
            <div className='p-4 bg-slate-800 rounded-md flex flex-col'>
              <div className='flex justify-between items-center'>
                <p className='font-bold p'>Description</p>
                {!showDescs[index] &&
                <i onClick={() => toggleDescription(index)} className="fa-solid fa-plus cursor-pointer"></i>
                }
                {showDescs[index] && 
                <i onClick={() => toggleDescription(index)} className="fa-solid fa-minus cursor-pointer"></i>
                }
              </div>
              {showDescs[index] &&
              <p>
                {workoutItem.description}
              </p>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Workout;
