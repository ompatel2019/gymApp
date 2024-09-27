import React, { useEffect, useState } from 'react';
import { generateWorkout } from '../utils/functions';

const Workout = ({ generateWorkoutParams }) => {
  const [workout, setWorkout] = useState([]);
  const [counters, setCounters] = useState([]);
  const [completeSets, setCompleteSets] = useState([]);
  const [showDescs, setShowDescs] = useState([]);
  const [timers, setTimers] = useState([]);
  const [originalTimers, setOriginalTimers] = useState([]);
  const [activeTimers, setActiveTimers] = useState([]);

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
      const restTimes = newWorkout.map(item => item.rest);
      setTimers(restTimes);
      setOriginalTimers(restTimes);
      setActiveTimers(new Array(newWorkout.length).fill(false));
    }
  }, [generateWorkoutParams]);

  useEffect(() => {
    const intervalIds = timers.map((_, index) =>
      setInterval(() => {
        if (activeTimers[index]) {
          setTimers((prevTimers) => {
            const newTimers = [...prevTimers];
            if (newTimers[index] > 0) {
              newTimers[index]--;
            } else {
              newTimers[index] = originalTimers[index]; // Reset to original time when it reaches zero
              setActiveTimers(active => active.map((act, idx) => idx === index ? false : act));
              clearInterval(intervalIds[index]);
            }
            return newTimers;
          });
        }
      }, 1000)
    );

    return () => intervalIds.forEach(clearInterval);
  }, [activeTimers, originalTimers]);

  const startTimer = (index) => {
    setActiveTimers((prev) => {
      const newActive = [...prev];
      newActive[index] = true;
      return newActive;
    });
  };

  const formatName = (name) => {
    return name.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const increment = (index) => {
    setCounters(prevCounters => prevCounters.map((count, idx) => {
      if (idx === index) {
        const newCount = count + 1;
        if (newCount > 3) { // Resets after 3
          return 0; // Reset counter after it reaches 3
        }
        return newCount;
      }
      return count;
    }));
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
            <div className='flex justify-between items-center max-sm:flex-col'>
              <p className='h5 font-bold text-[#91a2b7]'>{`0${index + 1}`}</p>
              <p className='h7 font-semibold capitalize'>{formatName(workoutItem.name)}</p>
              <p className='text-gray-400 capitalize'>{workoutItem.type}</p>
            </div>
  
            <div className='grid grid-cols-4 max-md:grid-cols-2 gap-2'>

              <div className='border-2 border-gray-500 p-2 w-full rounded-md'>
                <p className='font-light text-[#91a2b7]'>Reps</p>
                <p className='font-bold'>{workoutItem.reps}</p>
              </div>
  
              <div className='border-2 border-gray-500 p-2 w-full rounded-md'>
                <p className='font-light text-[#91a2b7]'>Tempo</p>
                <p className='font-bold'>{workoutItem.tempo}</p>
              </div>

              <div onClick={() => startTimer(index)} className='border-2 border-blue-500 p-2 w-full rounded-md cursor-pointer'>
                <p className='font-light text-[#91a2b7]'>Rest (Click to start)</p>
                <p className={`font-bold ${timers[index] < 10 && timers[index] > 0 ? 'text-red-500' : ''} ${timers[index] === 0 ? 'text-green-500' : ''}`}>
                  {timers[index]} sec
                </p>
              </div>
  
              <div className='border-2 border-blue-500 p-2 w-full rounded-md cursor-pointer' onClick={() => increment(index)}>
                <p className='font-light text-[#91a2b7]'>{counters[index] > 2 ? 'Set Completed!' : 'Set Counter'}</p>
                <p className='font-bold'>{`${counters[index]} / 3`}</p>
              </div>
            </div>
  
            <div className='p-4 bg-slate-800 rounded-md flex flex-col'>
              <div className='flex justify-between items-center'>
                <p className='font-bold p'>Description</p>
                <i onClick={() => setShowDescs(showDescs.map((show, idx) => idx === index ? !show : show))} className={`fa-solid ${showDescs[index] ? 'fa-minus' : 'fa-plus'} cursor-pointer`}></i>
              </div>
              {showDescs[index] &&
              <p className='text-sm'>
                {workoutItem.description}
              </p>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workout;
