import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../../utils/data.json';

const CheckerModify = () => {
  const navigate = useNavigate();

  // 오류 정보를 저장하기 위한 상태
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // 데이터에서 추출할 단락들을 저장할 배열
    const paragraphs = [];

    // 데이터를 순회하며 단락 정보를 추출하는 함수
    const extractParagraphs = item => {
      if (item.type === 'PARAGRAPH') {
        paragraphs.push(item);
      }
      if (item.ibody) {
        item.ibody.forEach(extractParagraphs);
      }
      if (item.table) {
        item.table.forEach(row => row.forEach(cell => extractParagraphs(cell)));
      }
    };

    // JSON 데이터의 본문(body)을 순회
    data.body.forEach(extractParagraphs);

    // 필터링하여 오류가 있는 단락만을 선택하고 각 단락에 대한 정보를 설정
    const allErrors = paragraphs
      .filter(p => p.errors && p.errors.length > 0)
      .map(p => ({
        originalText: p.errors[0].orgStr, // 원본 텍스트
        replacementText: p.errors[0].candWord ? p.errors[0].candWord.join(', ') : '', // 수정 추천
        userText: '', // 사용자 입력을 위한 빈 문자열 초기화
      }));

    // 상태를 업데이트하여 UI에 표시
    setErrors(allErrors);
  }, []);

  // 사용자의 입력이 변경될 때 호출되는 함수로, 해당 오류의 사용자 입력 상태를 업데이트
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
              </div>
              <div className="flex items-center my-4">
                <div className="text-black fontBold mr-5">추천 수정</div>
                <div className="fontBold">{error.replacementText}</div>
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
