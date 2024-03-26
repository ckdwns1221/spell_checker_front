import React from 'react'
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolling, setScrolling] = useState(false); // 스크롤 상태를 추적하기 위한 상태 변수

  useEffect(() => {
    // 스크롤 이벤트 핸들러를 추가
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolling(true); // 스크롤 위치가 0px 이상이면 scrolling 상태를 true로 설정
        } else {
            setScrolling(false); // 그 외의 경우에는 scrolling 상태를 false로 설정
        }
    };

    // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 언마운트될 때 스크롤 이벤트 리스너 제거
    return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Navbar의 클래스 이름을 동적으로 설정하고 scrolling 상태에 따라 배경색 클래스를 추가
    const navbg = `Nav fixed z-20 top-0 left-0 right-0 flex justify-between items-center py-3 ${scrolling ? 'nav-bg-scrolled' : ''}`;

  return (
    <>
      <div className={navbg}>
        <div className='flex justify-between w-10/12 mx-auto mt-4 text-lg'>
          <div className='fontBold'><span className='text-[#5e75ee]'>서식 유지</span> 맞춤법 검사기</div>
          <div className="flex justify-between text-base text-[#a9a9a9] my-auto">
            <div className='mx-2 px-2'>서비스소개</div>
            <div className='mx-2 px-2'>이용방법</div>
            <div className='mx-2 px-2'>문의하기</div>
          </div>
        </div>
      </div>
    </>
  )
}
