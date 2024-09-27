import React from 'react'
import {generateWorkout} from '../utils/functions'
import { SCHEMES } from '../utils/workouts';

const Workout = ({generateWorkoutParams}) => {
  const workoutArgs = {
    muscles: ['chest'], 
    poison: 'bodybuilder_split',           
    goal: 'growth_hypertrophy',        
  };
  const workout = generateWorkout(workoutArgs);
  console.log(generateWorkoutParams);
  console.log(workout);

  return (
    <div id='workout'>

      
      
      
    </div>
  )
}

export default Workout