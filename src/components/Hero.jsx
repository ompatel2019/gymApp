import React from 'react';

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center responsivePad min-h-screen space-y-4">
      <p className="p font-bold">
        IT'S TIME TO GET
      </p>

      <h1 className="h1 font-black text-blue-500">
        MASSIVE
      </h1>

      <div className="flex flex-col items-center space-y-6 2xl:space-y-8">
        <a href="#generator">
          <button className="button">
            Start the journey
          </button>
        </a>
      </div>
    </div>
  );
};

export default Hero;
