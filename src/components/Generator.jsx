import React, { useEffect, useState } from 'react';
import GeneratorSubheadings from './GeneratorSubheadings';
import { SCHEMES, WORKOUTS, SELECTIONS } from '../utils/workouts';

const Generator = () => {
  const regularClass = 'bg-slate-950 p-5 border-2 2xl:text-xl';
  const showModalClass = 'rounded-t-lg border-b-0';
  const [showModal, setShowModal] = useState(false);
  const [challenge, setChallenge] = useState('');
  const [muscles, setMuscles] = useState([]);
  const [goals, setGoals] = useState('');
  const [selectorText, setSelectorText] = useState('Select muscle groups');
  const [muscleGroup, setMuscleGroup] = useState([]);
  const [showMsg, setErrorMsg] = useState(false)

  useEffect(() => {
    if (challenge) {
      console.log('Selected Challenge:', challenge);
    }

    if (muscles.length > 0) {
      console.log('Selected Muscles:', muscles);
    }

    if (goals) {
      console.log('Selected Goal:', goals);
    }

    if (challenge === 'individual') {
      setSelectorText('Which body parts do you want to target? (up to 3)');
    } else if (challenge === 'bro_split') {
      setSelectorText('Which split would you like to do?');
    } else if (challenge === 'bodybuilder_split') { 
      setSelectorText('What do you want to target?')
    } else {
      setSelectorText('Which muscle group do you want to target?')
    }

  }, [challenge, goals, muscles]);

  const modalShow = () => {
    if (!challenge) {
      setErrorMsg(true)
      return;
    }

    setShowModal(prev => !prev);
  };
  // Function to handle challenge selection and update muscles accordingly
  const handleChallengeClick = (type) => {
    setChallenge(type);
  
    switch (type) {
      case 'individual':
        setMuscles(WORKOUTS.individual);
        break;
      case 'bro_split':
        // Convert WORKOUTS.bro_split to a flattened array of muscle groups
        setMuscles(Object.values(WORKOUTS.bro_split).flat());
        break;
      case 'bodybuilder_split':
        // Convert WORKOUTS.bodybuilder_split to a flattened array of muscle groups
        setMuscles(Object.values(WORKOUTS.bodybuilder_split).flat());
        break;
      case 'upper_lower':
        // Convert WORKOUTS.upper_lower to a flattened array of muscle groups
        setMuscles(Object.values(WORKOUTS.upper_lower).flat());
        break;
      default:
        setMuscles([]);
    }
  };

  return (
    <div id='generator' className='responsivePad flex flex-col items-center py-24 justify-center space-y-12'>
      <div className='space-y-8 w-[100%]'>
        <GeneratorSubheadings
          number={'01'}
          heading={'Choose Your Challenge'}
          subheading={'Pick the workout that pushes your limits.'}
        />

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 max-sm:gap-2'>
          {Object.keys(WORKOUTS).map((type, typeIndex) => (
            <button
              onClick={() => {handleChallengeClick(type); setErrorMsg(false)}}
              className={`${regularClass} hover:bg-white hover:border-blue-600 hover:text-black transition-all ease-in-out duration-500 rounded-lg ${
                challenge === type ? 'border-blue-400' : 'border-white'
              }`}
              key={typeIndex}
            >
              <p className='capitalize'>{type.replaceAll('_', ' ')}</p>
            </button>
          ))}
        </div>
      </div>

      <div className='w-[100%] space-y-8'>
        <GeneratorSubheadings
          number={'02'}
          heading={'Target Your Muscles'}
          subheading={'Select the muscle groups to train and sculpt.'}
        />
        {showMsg && <p className='text-center font-bold text-red-400 h7'>Pick a workout first</p> }
        <div>
          <div
            className={`${regularClass} flex items-center justify-between ${
              showModal ? showModalClass : 'rounded-lg'
            }`}
          >
            <p>{selectorText}</p>
            {!showModal && (
              <button onClick={modalShow}>
                <i className={`fa-solid fa-circle-arrow-down ${!challenge ? 'cursor-not-allowed' : 'cursor-pointer'}`}></i>
              </button>
            )}
            {showModal && (
              <button onClick={modalShow}>
                <i className='fa-solid fa-circle-arrow-up'></i>
              </button>
            )}
          </div>

          {showModal && muscles.length > 0 && (
          <div className='bg-slate-950 flex flex-col gap-4 w-full text-center justify-center items-center rounded-b-lg border-t-2 border-x-2'>
            {SELECTIONS[challenge]?.length > 0 ? (
              SELECTIONS[challenge].map((selection, selectionIndex) => (
                <p className={`p-2 hover:text-blue-400 capitalize cursor-pointer w-full border-b ${selectionIndex == 0 ? 'py-4' : 'py-2'}`} key={selectionIndex}>{selection}</p>
              ))
            ) : (
              <p>No muscle groups available for the selected challenge.</p>
            )}
          </div>
        )}
        </div>
      </div>

      <div className='space-y-8 w-[100%]'>
        <GeneratorSubheadings
          number={'03'}
          heading={'Set Your Goal'}
          subheading={'Define your ultimate fitness objective.'}
        />

        <div className='grid grid-cols-3 gap-8 max-sm:grid-cols-1 max-sm:gap-4'>
          {Object.keys(SCHEMES).map((scheme, schemeIndex) => (
            <button
              onClick={() => setGoals(scheme)}
              className={`${regularClass} hover:bg-white hover:border-blue-600 hover:text-black transition-all ease-in-out duration-500 rounded-lg ${
                goals === scheme ? 'border-blue-400' : 'border-white'
              }`}
              key={schemeIndex}
            >
              <p className='capitalize'>{scheme.replaceAll('_', ' ')}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Generator;
