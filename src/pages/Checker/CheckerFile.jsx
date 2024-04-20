import React from 'react';
import data from '../../utils/data.json'; // JSON 파일 임포트

const CheckerFile = () => {
  // 오류가 있는 텍스트를 처리하는 함수
  const renderTextWithErrors = (text, errors) => {
    console.log(text)
    if (!errors || errors.length === 0) {
      return <span>{text}</span>;
    }
    const sortedErrors = errors.sort((a, b) => a.start - b.start);
    let lastIndex = 0;
    const elements = [];

    sortedErrors.forEach(error => {
      // 오류 이전의 텍스트
      if (error.start > lastIndex) {
        elements.push(<span key={lastIndex}>{text.substring(lastIndex, error.start)}</span>);
      }
      // 오류 텍스트
      elements.push(
        <span key={error.start} style={{ color: 'red', fontWeight: 'bold' }}>
          {text.substring(error.start, error.end)}
        </span>,
      );
      lastIndex = error.end;
    });

    // 마지막 오류 뒤의 텍스트
    if (lastIndex < text.length) {
      elements.push(<span key={lastIndex}>{text.substring(lastIndex, text.length)}</span>);
    }

    return elements;
  };

  // JSON 데이터에서 필요한 정보를 추출하는 함수
  const renderContent = (section) => {
    if (section.type === 'PARAGRAPH') {
      return renderTextWithErrors(section.orgStr, section.errors);
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
    };
  };

  const renderPage = (data) => {
    return data.body.map((section, index) => <p key={index}>{renderContent(section)}</p>);
  }

  return (
    <div className="w-[70%] h-[60vh] bg-white border border-stone-300 scroll overflow-y-scroll">
      <div className="py-4 pl-5 pr-3">{renderPage(data)}</div>
    </div>
  );
};

export default CheckerFile;
