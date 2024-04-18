import React from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../../utils/images';

export default function FirstSection() {
  const navigate = useNavigate();

  const moveUpload = () => {
    navigate('/upload');
  };

  return (
    <>
      <div className="flex justify-evenly relative z-10  min-h-screen">
        <div className="my-auto">
          <img src={images.mainLapTop} alt="메인화면노트북" className="w-[500px]" />
        </div>
        <div className="flex flex-col my-auto">
          <div className="text-[64px] fontBold leading-tight">
            서식이 그대로! <br />
            맞춤법 검사기
          </div>
          <div className="my-4">
            맞춤법 검사기 사용 후 서식 수정이 귀찮으시다면
            <br />
            지금 경험해보세요!
          </div>
          <button className="w-5/12 h-[48px] rounded-lg text-center bg-[#303A6E] text-[#ffffff]" onClick={moveUpload}>
            맞춤법 검사하기
          </button>
        </div>
      </div>
    </>
  );
}
