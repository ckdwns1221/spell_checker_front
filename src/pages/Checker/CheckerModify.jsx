import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../../utils/data.json';

const CheckerModify = () => {
  const navigate = useNavigate();


  // 오류 정보를 저장할 상태, 오류 텍스트, 추천 수정, 사용자 입력, 체크된 섹션 정보가 있음
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const paragraphs = [];

    // 데이터를 돌면서 필요한 정보를 추출하는 함수
    const extractParagraphs = item => {
      if (item.type === 'PARAGRAPH') {
        paragraphs.push(item);
      }
      if (item.ibody) {
        item.ibody.forEach(extractParagraphs); // 내부 요소도 다시 순회
      }
      if (item.table) {
        item.table.forEach(row => row.forEach(cell => extractParagraphs(cell))); // 테이블 안의 내용도 순회
      }
    };

    // 전달받은 데이터의 본문을 순회하면서 시작
    data.body.forEach(extractParagraphs);

    // 오류가 있는 단락들만 걸러내고, 필요한 정보를 매핑
    const allErrors = paragraphs
      .filter(p => p.errors && p.errors.length > 0)
      .map(p => ({
        originalText: p.errors[0].orgStr, // 원본 텍스트
        replacementText: p.errors[0].candWord ? p.errors[0].candWord.join(', ') : '', // 추천 수정
        userText: '', // 사용자가 입력할 텍스트
        checkedSection: null, // 어떤 섹션이 체크됐는지
      }));

    // 상태 업데이트
    setErrors(allErrors);
  }, []);

  // 체크박스 토글하는 함수. 선택된 섹션을 수정
  const toggleCheck = (index, section) => {
    const updatedErrors = errors.map((error, i) =>
      i === index ? { ...error, checkedSection: error.checkedSection === section ? null : section } : error,
    );
    setErrors(updatedErrors);
  };

  // 사용자가 텍스트 입력할 때 호출되는 함수. 입력값을 업데이트
  const handleUserTextChange = (index, text) => {
    const updatedErrors = errors.map((error, i) => (i === index ? { ...error, userText: text } : error));
    setErrors(updatedErrors);
  };

  return (
    <>
      <div className="flex flex-col h-[60vh]">
        <div className="bg-slate-700 h-14 pb-3 sticky top-0">
          <div className="text-white text-lg pl-5 pt-3 fontSB">수정하기</div>
        </div>
        <div className="w-full h-full bg-white border-b border-r border-stone-300 scroll overflow-y-scroll">
          {errors.map((error, index) => (
            <div key={index} className="px-4 pb-1 text-sm">
              <div className="flex items-center my-2">
                <div className="text-black fontBold mr-5">기존 내용</div>
                <div className="fontBold text-red-500">{error.originalText}</div>
                <img
                  src={
                    error.checkedSection === 'original'
                      ? './assets/images/after_check.png'
                      : './assets/images/before_check.png'
                  }
                  alt="체크 표시"
                  onClick={() => toggleCheck(index, 'original')}
                  className="cursor-pointer ml-auto w-4 h-4"
                />
              </div>
              <div className="flex items-center my-4">
                <div className="text-black fontBold mr-5">추천 수정</div>
                <div className="fontBold">{error.replacementText}</div>
                <img
                  src={
                    error.checkedSection === 'replacement'
                      ? './assets/images/after_check.png'
                      : './assets/images/before_check.png'
                  }
                  alt="체크 표시"
                  onClick={() => toggleCheck(index, 'replacement')}
                  className="cursor-pointer ml-auto w-4 h-4"
                />
              </div>
              <div className="flex my-4">
                <div className="text-black fontBold mr-4">직접 수정</div>
                <input
                  type="text"
                  className="pl-1 w-2/3"
                  placeholder="원하는 대치어를 입력하세요."
                  value={error.userText}
                  onChange={e => handleUserTextChange(index, e.target.value)}
                />
                <img
                  src={
                    error.checkedSection === 'user'
                      ? './assets/images/after_check.png'
                      : './assets/images/before_check.png'
                  }
                  alt="체크 표시"
                  onClick={() => toggleCheck(index, 'user')}
                  className="cursor-pointer ml-auto w-4 h-4"
                />
              </div>
              <div className="flex justify-end">
                <button className="text-white text-xs px-5 py-1.5 bg-slate-700 fontBold rounded-[14px]">적용</button>
              </div>
              <hr className="w-full border border-gray-200 my-2" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CheckerModify;
