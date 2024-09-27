import React, { useEffect, useState } from 'react';
import GeneratorSubheadings from './GeneratorSubheadings';
import { SCHEMES, WORKOUTS } from '../utils/workouts';

const Generator = () => {
  const regularClass = 'bg-slate-950 p-5 border-2 2xl:text-xl';
  const showModalClass = 'rounded-t-lg border-b-0';
  const [showModal, setShowModal] = useState(false);
  const [challenge, setChallenge] = useState('');
  const [muscles, setMuscles] = useState([]);
  const [goals, setGoals] = useState('');

  useEffect(() => {
    if (challenge) {
      console.log(challenge);
    }

    if (muscles) {
      console.log(muscles);
    }

    if (goals) {
      console.log(goals);
    }
  }, [challenge, goals, muscles]);

  const modalShow = () => {
    setShowModal(prev => !prev);
  }

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
              onClick={() => setChallenge(type)}
              className={`${regularClass} hover:bg-white hover:border-black hover:text-black transition-all ease-in-out duration-500 rounded-lg ${
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
        <div>
          <div
            className={`${regularClass} flex items-center justify-between ${
              showModal ? showModalClass : 'rounded-lg'
            }`}
          >
            <p>Select muscle groups</p>
            {!showModal && (
              <button onClick={modalShow}>
                <i className='fa-solid fa-circle-arrow-down'></i>
              </button>
            )}
            {showModal && (
              <button onClick={modalShow}>
                <i className='fa-solid fa-circle-arrow-up'></i>
              </button>
            )}
          </div>

          {showModal && (
            <div className='bg-slate-950 flex flex-col gap-4 w-full text-center justify-center items-center rounded-b-lg border-b-2 border-x-2'>
              {challenge == 'individual' ? setMuscles(WORKOUTS.individual) : challenge == 'bro_split' ? setMuscles(WORKOUTS.bro_split) :  challenge === 'bodybuilder_split' ? setMuscles(WORKOUTS.bodybuilder_split) : setMuscles(WORKOUTS.upper_lower)}
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
              className={`${regularClass} hover:bg-white hover:border-black hover:text-black transition-all ease-in-out duration-500 rounded-lg ${goals === scheme ? 'border-blue-400' : 'border-white'}`}
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
