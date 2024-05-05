import React from 'react';

const CheckerFile = ({ data }) => {
  // 오류가 있는 텍스트를 처리하는 함수
  const renderTextWithErrors = (text, errors) => {
    if (!errors || errors.length === 0) {
      return <span>{text}</span>;
    }
    errors.sort((a, b) => a.start - b.start);

    let lastIndex = 0;
    const elements = [];

    errors.forEach((error, index) => {
      const color = error.checkedSection ? '#5e75f1' : 'red';
      if (error.start > lastIndex) {
        elements.push(<span key={`${index}-before`}>{text.substring(lastIndex, error.start)}</span>);
      }
      elements.push(
        <span key={error.start} style={{ color, fontWeight: 'bold' }}>
          {text.substring(error.start, error.end)}
        </span>,
      );
      lastIndex = error.end;
    });

    if (lastIndex < text.length) {
      elements.push(<span key="after">{text.substring(lastIndex)}</span>);
    }

    return elements;
  };

  // 섹션을 렌더링하는 함수
  const renderContent = section => {
    if (section.type === 'PARAGRAPH') {
      return <p>{renderTextWithErrors(section.orgStr, section.errors)}</p>;
    } else if (section.type === 'TABLE') {
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
    return null; // 테이블 및 단락 이외에는 렌더링하지 않음
  };

  // 페이지 전체를 렌더링하는 함수
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
