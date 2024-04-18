import React, { useState, useEffect } from 'react';
import axios from 'axios'; // HTTP 요청을 위한 axios 라이브러리
import { useNavigate } from 'react-router-dom'; // 페이지 이동

const CheckerFile = () => {
  const navigate = useNavigate();
  // 컴포넌트 상태 정의
  const [checkedText, setCheckedText] = useState(''); // 전체 텍스트
  const [originalText, setOriginalText] = useState(''); // 입력 내용 텍스트
  const [replacementText, setReplacementText] = useState(''); // 대치어

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

  return (
    <>
      <div className="w-[70%] bg-white border border-stone-300 scroll overflow-y-scroll">
        <div className="p-4">{checkedText}</div>
      </div>
    </>
  );
};

export default CheckerFile;
