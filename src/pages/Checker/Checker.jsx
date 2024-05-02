import React, { useState, useEffect } from 'react';
import Nav from '../../components/Nav'; // 네비게이션 컴포넌트
import { useNavigate, useLocation } from 'react-router-dom'; // 페이지 이동
import CheckerFile from './CheckerFile';
import CheckerModify from './CheckerModify';
import { images } from '../../utils/images';
import Predata from '../../utils/data.json';

function Checker() {
  const navigate = useNavigate();

  const location = useLocation();
  const initialData = location.state?.data || Predata; // 초기 데이터 로드

  const [data, setData] = useState(initialData);

  const updateData = newData => {
    setData(newData); // 상태 업데이트
  };

  const finishEdit = () => {
    navigate('/'); // 홈 페이지로 리디렉션
  };

  // 닫기 버튼 클릭 이벤트 핸들러
  const onClose = () => {
    navigate(-1); // 업로드 페이지로 돌아감
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen">
        <div className="w-10/12 bg-white rounded-xl shadow-md flex flex-col mx-auto items-center mt-24 p-4">
          <div className="text-3xl fontBold w-11/12 border-l-8 border-[#303A6E] pl-4 py-3 mt-4 flex justify-between">
            <div>맞춤법 검사</div>
          </div>
          <div className="flex items-center w-11/12 px-1 justify-between text-base text-[#a9a9a9]">
            <div className="text-sm">** 본 내용에서 서식은 무시됩니다.</div>
            <div className="flex items-center cursor-pointer" onClick="">
              <img src={images.Question} alt="물음표 아이콘" className="w-4 h-4 mx-2" />
              <div className="text-[#c8c8c8]">사용설명서</div>
            </div>
          </div>
          <div className="flex justify-center w-11/12 h-full mt-2">
            <CheckerFile data={data} />
            <CheckerModify data={data} onUpdateData={updateData} />
          </div>
          <div className="w-11/12 mt-4 flex justify-end items-center">
            <button
              className="text-sm text-white w-1/12 py-2 bg-slate-700 fontBold rounded-2xl mr-4"
              onClick={finishEdit}>
              수정 완료
            </button>
            <button className="text-sm w-1/12 py-2 bg-zinc-100 rounded-2xl border border-stone-300" onClick={onClose}>
              이전 화면
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Checker;
