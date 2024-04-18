import React, { forwardRef } from 'react'
import { images } from '../../utils/images';
import { FaSearch } from "react-icons/fa";

const SecondSection = forwardRef((props, ref) => {
  return (
    <>
      <div className='flex flex-col justify-center mt-28 relative z-10  min-h-screen w-11/12 mx-auto' 
           ref={reviewRef => (ref.current[0] = reviewRef)}>
        <div className="mt-14 text-center text-[40px] fontBold ">서비스 소개</div>
        <div className='flex my-auto mx-auto'>
          {/* 추후에 서비스 이용한 영상 혹은 carousel로 변경 */}
          <img src={images.mainIntro} 
               alt="검사기 이용방법 사진" 
               className='shadow-lg rounded-[50px]' />
          <div className='ml-24 my-auto'>
            <div className='bg-[#303A6E] w-[45px] h-[45px] p-[7px] rounded-lg'>
              <FaSearch color='#ffffff' size={30}/>
            </div>
            <div className='text-4xl fontBold my-6 leading-tight'>
              서식 유지로 인한 <br />
              빠른 업무 처리에 <br />
              최적화된 맞춤법 검사기
            </div>
            <div>
              서식을 수정할 필요 없이 파일을 업로드한 후, <br />
              맞춤법 여부를 확인해 수정하세요. <br />
              직접 수정과, 추천 수정 2가지 수정 방법을 <br />
              사용해 편리하게 수정해보세요.
            </div>
          </div>
        </div>
      </div>
    </>
  );
})

export default SecondSection;
