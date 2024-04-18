import React from 'react';
import { images } from '../utils/images';

export default function BgCircles() {
  return (
    <>
      <div className="relative">
        <img
          className="absolute w-[800px] -top-[300px] -left-[350px] rotate-[230deg]"
          src={images.mainCircle}
          alt="메인구체1"
        />
        <img
          className="absolute w-[800px] top-[400px] -right-[400px] rotate-[40deg]"
          src={images.mainCircle}
          alt="메인구체3"
        />
        <img
          className="absolute w-[800px] top-[1200px] -left-[450px] rotate-[140deg]"
          src={images.mainCircle}
          alt="메인구체2"
        />
        <img
          className="absolute w-[800px] top-[2000px] -right-[400px] rotate-[60deg]"
          src={images.mainCircle}
          alt="메인구체4"
        />
      </div>
    </>
  );
}
