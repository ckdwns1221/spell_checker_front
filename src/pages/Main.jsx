import React from 'react'
import { Link } from 'react-router-dom';
import Nav from './../components/Nav';
import { images } from '../utils/images';
/* import BgCircles from './../components/BgCircles'; */

export default function Main() {
  return (
    <>
      {/* <BgCircles /> */}
      <Nav />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
    </>
  )
}

export const FirstSection = () => {
  return (
    <>
      <div className='flex justify-evenly mt-28 relative z-10'>
        <div>
          <img src={ images.mainLapTop } alt="메인화면노트북" className='w-[500px]'/>
        </div>
        <div className='flex flex-col my-auto'>
          <div className='text-[64px] fontBold leading-tight'>
            서식이 그대로! <br />
            맞춤법 검사기
          </div>
          <div className='my-4'>
            맞춤법 검사기 사용 후 서식 수정이 귀찮으시다면<br />
            지금 경험해보세요!
          </div>
          <Link to='/upload'>
            <button className='w-5/12 h-[48px] rounded-lg text-center bg-[#303A6E] text-[#ffffff]'>
              맞춤법 검사하기
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export const SecondSection = () => {
  return (
    <>
      <div>

      </div>
    </>
  );
};

export const ThirdSection = () => {
  return (
    <>
      <div>

      </div>
    </>
  );
};
