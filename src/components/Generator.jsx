import React, { useEffect, useState } from 'react';
import GeneratorSubheadings from './GeneratorSubheadings';
import { SCHEMES, WORKOUTS, SELECTIONS } from '../utils/workouts';

const Generator = ({setGenerateWorkoutParams}) => {
  const regularClass = 'bg-slate-950 p-5 border-2 2xl:text-xl';
  const showModalClass = 'rounded-t-lg border-b-0';

  const [showModal, setShowModal] = useState(false);
  const [challenge, setChallenge] = useState('');
  const [muscles, setMuscles] = useState([]);
  const [goals, setGoals] = useState('');
  const [selectorText, setSelectorText] = useState('Select muscle groups');
  const [muscleGroup, setMuscleGroup] = useState([]);
  const [showMsg, setErrorMsg] = useState(false);
  const [showErr, setShowErr] = useState(false);

  // Handles the display of the modal
  const modalShow = () => {
    if (!challenge) {
      setErrorMsg(true);
      return;
    }
    setShowModal((prev) => !prev);
  };

  // Handles challenge selection and updates muscles based on selected challenge type
  const handleChallengeClick = (type) => {
    setChallenge(type);
    setErrorMsg(false);
    setMuscleGroup([]);

    switch (type) {
      case 'individual':
        setMuscles(WORKOUTS.individual);
        break;
      case 'bro_split':
        setMuscles(Object.values(WORKOUTS.bro_split).flat());
        break;
      case 'bodybuilder_split':
        setMuscles(Object.values(WORKOUTS.bodybuilder_split).flat());
        break;
      case 'upper_lower':
        setMuscles(Object.values(WORKOUTS.upper_lower).flat());
        break;
      default:
        setMuscles([]);
    }
  };

  // Handles selection of muscle groups
  const handleMuscleSelection = (selection) => {
    if (muscleGroup.includes(selection)) {
      const updatedMuscles = muscleGroup.filter((muscle) => muscle !== selection);
      setMuscleGroup(updatedMuscles);
      return;
    }
    if ((muscleGroup.length === 3 && challenge === 'individual') || (muscleGroup.length === 1 && challenge !== 'individual')) {
      return;
    }
    setMuscleGroup([...muscleGroup, selection]);
  };

  // Updates selector text based on the selected challenge
  useEffect(() => {
    if (challenge === 'individual') {
      setSelectorText('Which body parts do you want to target? (up to 3)');
    } else if (challenge === 'bro_split') {
      setSelectorText('Which split would you like to do?');
    } else if (challenge === 'bodybuilder_split') {
      setSelectorText('What do you want to target?');
    } else {
      setSelectorText('Which muscle group do you want to target?');
    }
  }, [challenge]);

  // useEffect(() => {
  //   if (challenge && muscleGroup && goals) { 
  //     const generateWorkoutParams = {
  //       muscles: muscleGroup,
  //       poison: challenge,
  //       goal: goals
  //     }
  //     setErrorMsg(false);
  //     setGenerateWorkoutParams(generateWorkoutParams);
  //   } else {
  //     setShowErr(true);
  //   }
  // }, [challenge, goals, muscles, muscleGroup]);

  return (
    <div id='generator' className='responsivePad flex flex-col items-center py-24 justify-center space-y-12'>
      <div className='space-y-8 w-full'>
        <GeneratorSubheadings
          number={'01'}
          heading={'Choose Your Challenge'}
          subheading={'Pick the workout that pushes your limits.'}
        />

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 max-sm:gap-2'>
          {Object.keys(WORKOUTS).map((type, index) => (
            <button
              onClick={() => handleChallengeClick(type)}
              className={`${regularClass} hover:bg-white hover:border-blue-600 hover:text-black transition-all ease-in-out duration-500 rounded-lg ${
                challenge === type ? 'border-blue-400' : 'border-white'
              }`}
              key={index}
            >
              <p className='capitalize'>{type.replaceAll('_', ' ')}</p>
            </button>
          ))}
        </div>
      </div>

      <div className='w-full space-y-8'>
        <GeneratorSubheadings
          number={'02'}
          heading={'Target Your Muscles'}
          subheading={'Select the muscle groups to train and sculpt.'}
        />
        {showMsg && <p className='text-center font-bold text-red-400 h7'>Pick a workout first</p>}
        <div>
          <div
            className={`${regularClass} flex items-center justify-between ${
              showModal ? showModalClass : 'rounded-lg'
            }`}
          >
              {muscleGroup.length ? (
                <div className='flex flex-wrap'>
                  {muscleGroup.map((muscle, index) => (
                    <span className='capitalize' key={index}>
                      {muscle}{index < muscleGroup.length - 1 ? '/' : ' '}
                    </span>
                  ))}
                </div>
              ) : (
                <p>{selectorText}</p>
              )}
            <button onClick={modalShow}>
              <i className={`fa-solid ${showModal ? 'fa-circle-arrow-up' : 'fa-circle-arrow-down'} ${!challenge ? 'cursor-not-allowed' : 'cursor-pointer'}`}></i>
            </button>
          </div>

          {showModal && muscles.length > 0 && (
            <div className='bg-slate-950 flex flex-col gap-4 w-full text-center justify-center items-center rounded-b-lg border-t-2 border-x-2'>
              {SELECTIONS[challenge]?.length > 0 ? (
                SELECTIONS[challenge].map((selection, index) => (
                  <p
                    onClick={() => handleMuscleSelection(selection)}
                    className={`p-2 hover:text-blue-400 capitalize cursor-pointer w-full border-b ${index === 0 ? 'py-4' : 'py-2'} ${muscleGroup.includes(selection) ? 'text-blue-500' : 'text-white'}`}
                    key={index}
                  >
                    {selection}
                  </p>
                ))
              ) : (
                <p>No muscle groups available for the selected challenge.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className='space-y-8 w-full'>
        <GeneratorSubheadings
          number={'03'}
          heading={'Set Your Goal'}
          subheading={'Define your ultimate fitness objective.'}
        />

        <div className='grid grid-cols-3 gap-8 max-sm:grid-cols-1 max-sm:gap-4'>
          {Object.keys(SCHEMES).map((scheme, index) => (
            <button
              onClick={() => setGoals(scheme)}
              className={`${regularClass} hover:bg-white hover:border-blue-600 hover:text-black transition-all ease-in-out duration-500 rounded-lg ${
                goals === scheme ? 'border-blue-400' : 'border-white'
              }`}
              key={index}
            >
              <p className='capitalize'>{scheme.replaceAll('_', ' ')}</p>
            </button>
          ))}
        </div>
      </div>

      {showErr &&
        <p className='text-center font-bold text-red-400 h7'>Incomplete Fields</p>
      }

      <a href="#workout">
          <button onClick={() => {
            if (challenge && goals && muscleGroup.length > 0) {
              const generateWorkoutParams = {
                muscles: muscleGroup,
                poison: challenge,
                goal: goals
              }
              setShowErr(false);
              setGenerateWorkoutParams(generateWorkoutParams);
            } else {
              setShowErr(true);
            }
          }} className="button">
            Generate
          </button>
      </a>


    </div>
  );
};

export default Generator;
