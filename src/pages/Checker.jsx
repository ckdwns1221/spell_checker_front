import React, { useState, useEffect } from 'react';
import Nav from './../components/Nav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checker() {
  const navigate = useNavigate();
  const [checkedText, setCheckedText] = useState('');

  useEffect(() => {
    const fetchCheckedText = async () => {
      try {
        const response = await axios.get('여기에_백엔드_URL_입력');
        setCheckedText(response.data.text);
      } catch (error) {
        console.error('Axios error:', error);
        setCheckedText('데이터를 불러오는 데 실패했습니다.');
      }
    };

    fetchCheckedText();
  }, []);

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center h-screen">
        <div className="w-10/12 h-4/5 bg-white rounded-xl shadow flex flex-col items-center pt-16">
          <div className="w-10/12 flex justify-between items-center">
            <div 
              className="ml-auto cursor-pointer text-stone-500 text-xl font-bold font-['Inter'] flex items-center"
              onClick={() => navigate('/upload')}
            >
              <img src='./assets/images/prev_arrow.png' alt='이전화면 화살표' className='h-4 mr-2'/>
              이전 화면
            </div>
          </div>
          <div className="w-9/12 mt-4">
            <div className="h-16 bg-white border-l-8 border-slate-700 flex items-center pl-6">
              <div className="text-4xl fontBold">맞춤법 검사</div>
            </div>
            <div className="flex mt-4">
              {/* 스크롤 기능 추가된 박스 1 */}
              <div className="flex-1 mr-2 h-[450px] bg-white border border-stone-300 overflow-y-scroll">
                <div className="p-4">
                  {checkedText} {/* 여기에 긴 텍스트가 들어가면 스크롤바가 활성화됩니다. */}
                </div>
              </div>
              {/* 맞춤법 교정 내용 보여주는 부분 */}
              <div className="flex-1 ml-2 h-[450px] bg-white border border-stone-300">
                <div className='bg-slate-700 h-14'>
                  <div className='text-white text-lg pl-5 pt-3 fontSB'>맞춤법 검사</div>
                </div>
              </div>
            </div>
          </div>
           {/* 검사시작 및 닫기 버튼 */}
           <div className="w-10/12 mt-4 flex justify-end items-center pr-14">
            <button className="text-white w-32 h-10 bg-slate-700 font-medium rounded-2xl mr-4">
              수정 완료
            </button>
            <button className="w-32 h-10 bg-zinc-100 rounded-2xl border border-stone-300">
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checker;
