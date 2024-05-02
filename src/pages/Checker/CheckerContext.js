// CheckerContext.js
import React, { createContext, useContext, useState } from 'react';

const CheckerContext = createContext();

export function useChecker() {
  return useContext(CheckerContext);
}

export const CheckerProvider = ({ children }) => {
  const [documentBody, setDocumentBody] = useState([]);
  const [errors, setErrors] = useState([]); // 에러 상태 추가

  const defaultContextValue = {
    documentBody: [],
    setDocumentBody: () => {},
    errors: [],
    setErrors: () => {},
    updateDocumentBody: () => {},
  };

  const CheckerContext = createContext(defaultContextValue);

  // 문서 내 에러를 추출하는 함수
  const extractErrors = data => {
    let errors = [];
    const extract = item => {
      if (item.type === 'PARAGRAPH' && item.errors && item.errors.length > 0) {
        errors = errors.concat(
          item.errors.map(error => ({
            paragraphId: item.id,
            originalText: error.orgStr,
            startIndex: error.start,
            endIndex: error.end,
            replacementText: error.candWord ? error.candWord.join(', ') : '',
            userText: '',
          })),
        );
      }
      if (item.ibody) {
        item.ibody.forEach(extract);
      }
      if (item.table) {
        item.table.forEach(row => row.forEach(cell => extract(cell)));
      }
    };

    data.body.forEach(extract);
    return errors;
  };

  // 문서 데이터를 업데이트하는 함수
  const updateDocumentBody = newData => {
    setDocumentBody(newData);
    const extractedErrors = extractErrors(newData);
    setErrors(extractedErrors); // 추출된 에러 상태 업데이트
  };

  return (
    <CheckerContext.Provider value={{ documentBody, errors, updateDocumentBody }}>{children}</CheckerContext.Provider>
  );
};
