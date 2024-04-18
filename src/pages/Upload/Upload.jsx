import React, { useState } from 'react';
import Nav from '../../components/Nav';

function Upload() {
  const [inputType, setInputType] = useState('file'); // 입력 유형 상태 관리 ('file' 또는 'text')
  const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일 상태 관리
  const [text, setText] = useState(''); // 텍스트 입력 창 상태

  const textChange = e => {
    setText(e.target.value);
  };

  const handleFileChange = e => {
    setSelectedFile(e.target.files[0]); // 선택된 파일 상태 업데이트
  };

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10/12 h-4/5 bg-white rounded-xl shadow flex flex-col items-center pt-20">
          {/* 문서 업로드 제목 */}
          <div className="w-10/12">
            <div className="h-16 bg-white border-l-8 border-slate-700 flex items-center pl-6">
              <div className="text-4xl fontBold">문서 업로드</div>
            </div>
          </div>
          {/* 사용메뉴얼 */}
          <div className="w-10/12 mt-8 flex justify-end">
            <div className="flex items-center">
              <img src="./assets/images/QuestionMark.png" alt="사용메뉴얼" className="h-5 mr-1" />
              <span className="text-stone-300 text-l leading-normal">사용메뉴얼</span>
            </div>
          </div>
          {/* 상단 border */}
          <div className="w-10/12 border-2 border-slate-700 mt-4"></div>
          {/* 중앙 박스 */}
          <div className="flex w-10/12 mt-12 mb-12 ml-20">
            <div className="flex justify-between w-full items-center">
              {inputType === 'file' ? (
                <label className="w-80 h-80 bg-neutral-50 rounded-[10px] border border-dashed border-neutral-400 flex justify-center items-center cursor-pointer">
                  <input type="file" className="hidden" onChange={handleFileChange} />
                  <div className="flex flex-col items-center">
                    {/* 파일이 선택되었을 경우 파일 이름을 표시하거나, 기본 메시지를 보여줍니다. */}
                    {selectedFile ? (
                      <div className="text-neutral-400 text-xl">{selectedFile.name}</div>
                    ) : (
                      <>
                        <img src="./assets/images/file_upload.png" alt="파일업로드" className="size-16" />
                        <div className="mt-5 text-neutral-400 text-xl">Drag file to upload</div>
                      </>
                    )}
                  </div>
                </label>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-80 flex flex-col bg-white border border-zinc-300">
                    <div className="bg-stone-50 text-center p-2 border border-zinc-300 text-sm">문서 내용</div>
                    <div className="flex flex-col justify-center items-center">
                      <textarea
                        id="textArea"
                        className="w-full h-64 p-4 bg-white border-none rounded-md resize-none"
                        placeholder="텍스트를 입력해주세요."
                        value={text}
                        onChange={textChange}></textarea>
                    </div>
                  </div>
                  <div className="text-right w-80">{`${text.length}/1000자`}</div>
                </div>
              )}
              {/* 검사 정보 목록 */}
              <div className="flex flex-col ml-8 w-3/5">
                {/* 검사명 */}
                <div className="flex flex-col pb-10">
                  <div className="flex items-center">
                    <img src="./assets/images/list_disc.png" alt="리스트 원" className="mr-4" />
                    <span className="text-lg font-medium">검사명</span>
                    <input className="ml-10 p-1 h-8 bg-white border border-zinc-400 w-2/4" />
                  </div>
                  <div className="ml-28 mt-4 text-neutral-400 text-opacity-95 text-xs font-bold">
                    * 파일 다운 시 작성하신 검사명으로 파일 명이 작성됩니다..
                  </div>
                </div>
                {/* 검사 유형 */}
                <div className="flex items-center pb-4">
                  <img src="./assets/images/list_disc.png" alt="리스트 원" className="mr-4" />
                  <span className="text-lg font-medium">검사 유형</span>
                  {/* 라디오 버튼 */}
                  <div className="flex ml-6 items-center">
                    <div className="flex items-center mr-4">
                      <input type="radio" id="BUSAN_UNIV" name="spellCheckService" value="BUSAN_UNIV" />
                      <label htmlFor="BUSAN_UNIV" className="ml-2">
                        부산대 맞춤법 검사기
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input type="radio" id="INCRUIT" name="spellCheckService" value="INCRUIT" />
                      <label htmlFor="INCRUIT" className="ml-2">
                        인크루트 맞춤법 검사기
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="JOB_KOREA" name="spellCheckService" value="JOB_KOREA" />
                      <label htmlFor="JOB_KOREA" className="ml-2">
                        잡코리아 맞춤법 검사기
                      </label>
                    </div>
                  </div>
                </div>
                {/* 검사설정 */}
                <div className="flex items-center w-full mt-5">
                  <div className="flex items-center">
                    <img src="./assets/images/list_disc.png" alt="리스트 원" className="mr-4" />
                    <span className="text-lg font-medium">검사설정</span>
                  </div>
                  <div className="flex items-center">
                    {/* 파일, 텍스트 라디오 버튼 */}
                    <div className="flex items-center ml-7">
                      <input
                        type="radio"
                        id="file"
                        name="inputType"
                        value="file"
                        checked={inputType === 'file'}
                        onChange={e => setInputType(e.target.value)}
                      />
                      <label htmlFor="file" className="ml-2">
                        파일
                      </label>
                    </div>
                    <div className="flex items-center ml-20">
                      <input
                        type="radio"
                        id="text"
                        name="inputType"
                        value="text"
                        checked={inputType === 'text'}
                        onChange={e => setInputType(e.target.value)}
                      />
                      <label htmlFor="text" className="ml-2">
                        텍스트
                      </label>
                    </div>
                  </div>
                </div>
                <div className="text-neutral-400 text-sm font-bold font-['Epilogue'] leading-normal pt-5 pl-28">
                  <div className="mb-2">
                    * 파일 참고란
                    <br />
                  </div>
                  <div>
                    &nbsp;허용 확장자 : *.docx, *.txt, *.hwp
                    <br />
                    &nbsp;문서 첨부 제한 : 0Byte/ 100.0MB
                    <br />
                    &nbsp;파일 제한 크기 : 100MB
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 하단 border */}
          <div className="w-10/12 border-2 border-slate-700"></div>
          {/* 검사시작 및 닫기 버튼 */}
          <div className="w-10/12 mt-4 flex justify-end items-center">
            <button className="text-white w-32 h-10 bg-slate-700 font-medium rounded-2xl mr-4">검사 시작</button>
            <button className="w-32 h-10 bg-zinc-100 rounded-2xl border border-stone-300">닫기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Upload;
