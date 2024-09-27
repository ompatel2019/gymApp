import React from 'react'
import {generateWorkout} from '../utils/functions'
import { SCHEMES } from '../utils/workouts';

const Workout = () => {
  const workoutArgs = {
    muscles: ['chest'], // List of muscle groups
    poison: 'bodybuilder_split',           // Type of workout ('individual' or a workout name)
    goal: 'strength_power',               // The goal or scheme to be used
  };
  const workout = generateWorkout(workoutArgs);
  console.log(workout);
  return (
    <div>
      
    </div>
  )
}

export default Workout