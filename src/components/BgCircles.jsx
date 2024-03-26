import React from 'react'
import { images } from '../utils/images'

export default function BgCircles() {
  return (
    <>
      <div className='relative'>
        <img className="absolute w-7/12 -top-[420px] -left-[400px] rotate-[230deg]" src={images.mainCircle} alt="메인구체1" />
        <img className="absolute w-7/12 top-[350px] -right-[400px] rotate-[32deg]" src={images.mainCircle} alt="메인구체3" />
        <img className="absolute w-7/12 top-[1000px] -left-[400px] rotate-[175deg]" src={images.mainCircle} alt="메인구체2" />
        <img className="absolute w-7/12 top-[1650px] -right-[400px] rotate-[40deg]" src={images.mainCircle} alt="메인구체4" />
      </div>
    </>
  )
}
