import React, { forwardRef } from 'react'
import { RiKakaoTalkFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

const Footer = forwardRef((props, ref) => {
  return (
    <>
      <div className='relative z-20 bg-[#191f28] text-[#ffffff] text-center py-12 min-h-min' 
           ref={reviewRef => (ref.current[2] = reviewRef)}>
        <div className="fontBold text-start text-[40px] mb-8 w-10/12 mx-auto">문의하기</div>
        <div className="leading-loose">
          <div>
            서식 유지 맞춤법 검사기는 성결대학교 컴퓨터공학과 졸업작품으로 제작하였습니다. <br />
            서비스 및 팀 관련 문의는 아래 채널들을 통해 연락해주시길 바랍니다.
          </div>
          <div className='flex mt-9 mb-8 justify-center'>
            <div className='rounded-full  bg-[#ffffff] w-[50px] h-[50px] pt-[7px] pl-[7px] mx-4'>
              <RiKakaoTalkFill size={36} color='#191f28' />
            </div>
            <div className='rounded-full bg-[#ffffff] w-[50px] h-[50px] pt-[7px] pl-[7px] mx-4'>
              <MdOutlineEmail size={36} color='#191f28' />
            </div>
            <div className='rounded-full bg-[#ffffff] w-[50px] h-[50px] pt-[7px] pl-[7px] mx-4'>
              <FaInstagram size={36} color='#191f28' />
            </div>
          </div>
          <div>
            asdf1234@gmail.com
          </div>
          <div className='text-xl fontBold'>
            spell-checker.com ⓒ 2024
          </div>
          <div className='text-sm leading-loose mb-8'>
            최종 업데이트: 2024.04
          </div>
        </div>
      </div>
    </>
  );
});

export default Footer;
