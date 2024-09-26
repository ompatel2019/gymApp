import React from 'react';

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center responsivePad min-h-screen space-y-4">
      <p className="p font-bold">
        IT'S TIME TO GET
      </p>

      <h1 className="h1 font-bold text-blue-500">
        MASSIVE
      </h1>

      <div className="flex flex-col items-center space-y-6 2xl:space-y-8">
        <p className="h7 text-center font-normal">
          I acknowledge the potential risks associated with significant muscle growth, including body dysmorphia and challenges with everyday mobility.
        </p>
        
        <button className="button">
          Start the journey
        </button>
      </div>
    </div>
  );
};

export default Hero;
