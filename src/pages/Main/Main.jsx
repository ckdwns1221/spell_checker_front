import { React, useRef } from 'react'
import Nav from '../../components/Nav';
import BgCircles from '../../components/BgCircles';
import FirstSection from './FirstSection';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';
import Footer from './../../components/Footer';
import ScrollTop from './../../utils/ScrollTop';

export default function Main() {
  const scrollRef = useRef([]);

  return (
    <>
      <BgCircles />
      {/* NavBar에는 scrollRef의 배열을 props로 넘겨준다. */}
      <Nav scrollRef={scrollRef} />

      {/* 이동할 각각의 컴포넌트에 ref로 넘겨준다. */}
      <FirstSection />
      <SecondSection ref={scrollRef} />
      <ThirdSection ref={scrollRef} />
      <Footer ref={scrollRef} />
      <ScrollTop />
    </>
  )
}
