import React from 'react';

const GeneratorSubheadings = ({ number, heading, subheading }) => {
  return (
    <div className='flex flex-col items-center space-y-2'> 
      <div className='flex items-center space-x-4 justify-center'>
        <h2 className='h3 font-bold text-[#91a2b7]'>
          {number}
        </h2>
        <h3 className='h4 font-semibold text-center'> 
          {heading}
        </h3>
      </div>
      <p className='text-center h7'>
        {subheading}
      </p>
    </div>
  );
};

export default GeneratorSubheadings;
