import React from 'react'
import {generateWorkout} from '../utils/functions'
import { SCHEMES } from '../utils/workouts';

const Workout = () => {
  const workoutArgs = {
    muscles: ['biceps', 'triceps'], // List of muscle groups
    poison: 'individual',           // Type of workout ('individual' or a workout name)
    goal: 'growth_hypertrophy',               // The goal or scheme to be used
  };
  const workout = generateWorkout(workoutArgs);
  console.log(workout);
  return (
    <div>
      
    </div>
  )
}

export default Workout