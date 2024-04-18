import React, { useState, useEffect } from 'react';
import Nav from './../components/Nav'; // 네비게이션 컴포넌트
import axios from 'axios'; // HTTP 요청을 위한 axios 라이브러리
import { useNavigate } from 'react-router-dom'; // 페이지 이동

function Checker() {
  const navigate = useNavigate();
  // 컴포넌트 상태 정의
  const [checkedText, setCheckedText] = useState(''); // 전체 텍스트
  const [originalText, setOriginalText] = useState(''); // 입력 내용 텍스트
  const [replacementText, setReplacementText] = useState(''); // 대치어
  const [userText, setUserText] = useState(''); // 사용자가 입력한 수정 텍스트
  const [replaceChecked, setReplaceChecked] = useState(false); // 대치어 체크 상태
  const [userChecked, setUserChecked] = useState(false); // 직접수정 체크 상태

  // 컴포넌트 실행시 백엔드에서 데이터를 불러옴
  useEffect(() => {
    const fetchCheckedText = async () => {
      try {
        const response = await axios.get('백엔드api주소 입력하세요.');
        // 성공적으로 데이터를 받아온 경우, 상태 업데이트
        setCheckedText(response.data.text); // 서버에서 받아온 전체 텍스트 
        setOriginalText(response.data.original); // 서버에서 받아온 입력 내용 텍스트
        setReplacementText(response.data.replacement); // 서버에서 받아온 대치어 텍스트
      } catch (error) {
        // 데이터 요청 중 오류가 발생한 경우
        console.error('요청이 전달되지 않았습니다.', error);
        setCheckedText('전공종합설계');
        setOriginalText('아키텍처');
        setReplacementText('컴퓨터구조의');
      }
    };
    fetchCheckedText(); // 백엔드에서 데이터 가져오는 함수
  }, []);

  // 수정 완료 버튼 클릭 이벤트 핸들러
  const finishEdit = () => {
    navigate('/'); // 홈 페이지로 리디렉션
  };

  // 닫기 버튼 클릭 이벤트 핸들러
  const onClose = () => {
    navigate(-1); // 업로드 페이지로 돌아감
  };

  // 대치어 체크 표시를 클릭할 때 호출
  const reCheck = () => {
    setReplaceChecked(true); // 대치어 체크를 활성화
    setUserChecked(false); // 직접 수정 체크를 비활성화
  };

  // 직접 수정 체크 표시를 클릭할 때 호출
  const usCheck = () => {
    setUserChecked(true); // 직접 수정 체크를 활성화
    setReplaceChecked(false); // 대치어 체크를 비활성화
  };

  return (
    <>
      <Nav /> {/* 상단 네비게이션 바 */}
      <div className="flex justify-center items-center h-screen">
        <div className="w-10/12 h-4/5 bg-white rounded-xl shadow flex flex-col items-center pt-16">
          {/* 이전 화면으로 이동하는 버튼 */}
          <div className="w-10/12 flex justify-between items-center">
            <div 
              className="ml-auto cursor-pointer text-stone-500 text-xl font-bold font-['Inter'] flex items-center"
              onClick={() => navigate('/upload')}
            >
              <img src='./assets/images/prev_arrow.png' alt='이전화면 화살표' className='h-4 mr-2'/>
              이전 화면
            </div>
          </div>
          {/* 맞춤법 검사 결과 제목 및 결과 표시 영역 */}
          <div className="w-9/12 mt-4">
            <div className="h-16 bg-white border-l-8 border-slate-700 flex items-center pl-6">
              <div className="text-4xl fontBold">맞춤법 검사</div>
            </div>
            <div className="flex mt-4">
              {/* 검사된 텍스트를 표시하는 영역 */}
              <div className="flex-1 mr-2 h-[450px] bg-white border border-stone-300 overflow-y-scroll">
                <div className="p-4">
                  {checkedText}
                </div>
              </div>
              {/* 입력 내용 및 대치어, 직접수정 */}
              <div className="flex-1 ml-2 h-[450px] bg-white border border-stone-300">
                <div className='bg-slate-700 h-14'>
                  <div className='text-white text-lg pl-5 pt-3 fontSB'>맞춤법 검사</div>
                </div>
                <div className="p-4">
                  {/* 입력 내용과 원본 텍스트 나란히 배치 */}
                  <div className="flex items-center mb-4">
                    <div className="text-black text-xl fontBold mr-4">입력 내용</div>
                    <div className='fontBold text-lg text-red-500'>{originalText}</div> {/* 원본 텍스트 표시 */}
                  </div>
                  {/* 대치어 라벨과 대치어 텍스트 나란히 배치 */}
                  <div className="flex items-center pt-4">
                    <div className="text-black text-xl fontBold mr-9">대치어</div>
                    <div className='fontBold text-lg'>{replacementText}</div> {/* 대치어 텍스트 표시 */}
                    {replaceChecked ? (
                      // 체크 상태가 true일 때 선택 후 체크 표시를 보여줍니다.
                      <img src='./assets/images/after_check.png' alt='선택 후 체크 표시' onClick={reCheck} className='cursor-pointer ml-auto'/>
                    ) : (
                      // 체크 상태가 false일 때 선택 전 체크 표시를 보여줍니다.
                      <img src='./assets/images/before_check.png' alt='선택 전 체크 표시' onClick={reCheck} className='cursor-pointer ml-auto'/>
                    )}
                  </div>
                    {/* 사용자가 직접 수정할 텍스트 입력하는 부분 */}
                    <div className="flex items-center pt-5">
                      <div className="text-black text-xl fontBold mr-4">직접 수정</div>
                      <textarea
                        className="pt-6 w-2/3 resize-none"
                        placeholder="원하는 대치어를 입력하세요."
                        value={userText}
                        onChange={(e) => setUserText(e.target.value)}
                      ></textarea>
                      {userChecked ? (
                      // 체크 상태가 true일 때 선택 후 체크 표시를 보여줍니다.
                      <img src='./assets/images/after_check.png' alt='선택 후 체크 표시' onClick={usCheck} className='cursor-pointer ml-auto'/>
                    ) : (
                      // 체크 상태가 false일 때 선택 전 체크 표시를 보여줍니다.
                      <img src='./assets/images/before_check.png' alt='선택 전 체크 표시' onClick={usCheck} className='cursor-pointer ml-auto'/>
                    )}
                  </div>
                  <div className="flex justify-end pt-2">
                  <button className="text-white w-28 h-9 bg-slate-700 fontBold rounded-2xl">적용</button>
                </div>
                </div>
                <hr class=" w-full border border-gray-200" />
              </div>
            </div>
          </div>
          {/* 수정 완료 및 닫기 버튼 */}
          <div className="w-10/12 mt-4 flex justify-end items-center pr-14">
            <button 
              className="text-white w-32 h-10 bg-slate-700 fontBold rounded-2xl mr-4"
              onClick={finishEdit}
            >
              수정 완료
            </button>
            <button 
              className="w-32 h-10 bg-zinc-100 rounded-2xl border border-stone-300"
              onClick={onClose}
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checker; 