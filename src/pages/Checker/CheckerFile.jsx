import React from 'react';

const CheckerFile = ({ data }) => {
  // 텍스트에 에러를 하이라이트하여 렌더링하는 함수
  const renderTextWithErrors = (text, errors) => {
    // 에러가 없으면 단순히 텍스트를 span 안에 넣어 반환
    if (!errors || errors.length === 0) {
      return <span>{text}</span>;
    }
    // 에러를 시작 위치 기준으로 정렬
    errors.sort((a, b) => a.start - b.start);

    let lastIndex = 0;
    const elements = [];

    // 각 에러를 순회하며 텍스트를 적절히 분리하고 스타일을 적용
    errors.forEach((error, index) => {
      const color = error.checkedSection ? '#5e75f1' : 'red'; // 에러 유형에 따라 조건부 스타일 적용
      // 에러 시작 전까지의 텍스트가 있다면 스타일 없이 추가
      if (error.start > lastIndex) {
        elements.push(<span key={`${index}-before`}>{text.substring(lastIndex, error.start)}</span>);
      }
      // 에러가 있는 텍스트 부분에 스타일을 적용
      elements.push(
        <span key={error.start} style={{ color, fontWeight: 'bold' }}>
          {text.substring(error.start, error.end)}
        </span>,
      );
      lastIndex = error.end; // lastIndex를 현재 에러의 끝 위치로 업데이트
    });

    // 마지막 에러 이후의 텍스트를 추가
    if (lastIndex < text.length) {
      elements.push(<span key="after">{text.substring(lastIndex)}</span>);
    }

    return elements;
  };

  // 다양한 섹션 타입을 렌더링하는 함수
  const renderContent = section => {
    // 단락 타입의 섹션을 렌더링
    if (section.type === 'PARAGRAPH') {
      return <p>{renderTextWithErrors(section.orgStr, section.errors)}</p>;
    } else if (section.type === 'TABLE') {
      // 테이블 타입의 섹션을 렌더링
      return (
        <table style={{ width: '100%', border: '1px solid black', padding: '4px' }}>
          <tbody>
            {section.table.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    colSpan={cell.colspan}
                    rowSpan={cell.rowspan}
                    style={{ border: '1px solid black', padding: '4px' }}>
                    {cell.ibody.map((item, itemIndex) => (
                      <p key={itemIndex}>{renderContent(item)}</p>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    // 다루지 않는 섹션 타입의 경우 null을 반환
    return null;
  };

  // 전체 페이지를 렌더링하는 주 함수
  const renderPage = data => {
    return data.body.map((section, index) => <div key={index}>{renderContent(section)}</div>);
  };

  return (
    <div className="w-[70%] h-[60vh] bg-white border border-stone-300 scroll overflow-y-scroll">
      <div className="py-4 pl-5 pr-3">{renderPage(data)}</div>
    </div>
  );
};

export default CheckerFile;
