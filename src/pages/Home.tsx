import { useRef, useState } from 'react';
import { Button } from '../components/common/Button';
import MusinsaLogo from "../assets/Images/MusinsaLogo.svg";
import ZigzagLogo from "../assets/Images/ZigzagLogo.svg";
import Logo29cm from "../assets/Images/29cmLogo.svg";
import WLogo from "../assets/Images/WLogo.svg";

const Home = () => {
  const [ratio4, setRatio4] = useState(0);
  const scrollRef4 = useRef<HTMLDivElement>(null);

  const handleScroll4 = () => {
    if (scrollRef4.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef4.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft > 0) setRatio4(scrollLeft / maxScrollLeft);
    }
  };

  const [ratio5, setRatio5] = useState(0);
  const scrollRef5 = useRef<HTMLDivElement>(null);

  const handleScroll5 = () => {
    if (scrollRef5.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef5.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft > 0) setRatio5(scrollLeft / maxScrollLeft);
    }
  };

  const INDICATOR_MAX_DISTANCE = 37;

  return (
    <div className="flex flex-col w-full bg-white pb-10">
      
      {/* 1. 상단 섹션 */}
      <section className="px-5 pt-6 pb-2">
        <h2 className="text-[#000000] text-[20px] font-[500] leading-normal mt-1">
          파트너 쇼핑몰
        </h2>
        <p className="text-[#596373] text-[12px] font-[400] leading-[150%] tracking-[-0.36px]">
          유명 브랜드 가상 피팅가이드를 확인해보세요
        </p>
      </section>

      {/* 2. 파트너 쇼핑몰 (동일) */}
      <section className="flex gap-3 px-5 py-4 overflow-x-auto no-scrollbar">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="min-w-[75px] h-[75px] bg-[#D2D2D2] rounded-[6px] flex items-center justify-center">
            <span className="text-[10px] text-neutral-500">Logo</span>
          </div>
        ))}
      </section>

      {/* 3. 가상 피팅 가이드 & 상품 추가 */}
      <section className="flex flex-col items-center px-5 mt-4 gap-4">
        <span className="text-[#8D98FF] text-[10px] font-[400] leading-[150%] tracking-[-0.3px] font-['Pretendard'] border-b border-[#8D98FF] cursor-pointer">
          유명 브랜드 가상 피팅 가이드
        </span>
        <div className="w-[321px]">
          <Button variant="filled">상품 추가하기</Button>
        </div>
      </section>
      {/* 4. 상품 둘러보기 섹션 */}
      <section className="px-5 mt-10">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-[#000000] text-[20px] font-[500] leading-[150%] tracking-[-0.6px]">
            상품 둘러보기
          </h3>
          {/* 글씨색 검정으로 변경 및 화살표 추가 */}
          <span className="text-[12px] text-[#000000] font-medium cursor-pointer mb-1">
            전체보기 →
          </span>
        </div>
        <p className="text-[#444444] text-[12px] font-[400] mt-[-12px] mb-4">
          다양한 쇼핑몰의 상품을 한 곳에서 확인하세요
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="w-[137px] h-[182px] bg-[#D2D2D2] rounded-[10px] flex items-center justify-center">
              <span className="text-2xl text-neutral-500">+</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 최근 피팅 내역 섹션 (추가하기 형태로 변경) */}
      <section className="px-5 mt-10 pb-10">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-[#000000] text-[20px] font-[500] leading-[150%] tracking-[-0.6px]">
            최근 피팅 내역
          </h3>
          {/* 글씨색 검정으로 변경 및 화살표 추가 */}
          <span className="text-[12px] text-[#000000] font-medium cursor-pointer mb-1">
            전체보기 →
          </span>
        </div>
        <p className="text-[#444444] text-[12px] font-[400] mt-[-12px] mb-4">
          최근 피팅 내역을 확인해보세요
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="w-[137px] h-[182px] bg-[#D2D2D2] rounded-[10px] flex items-center justify-center">
              <span className="text-2xl text-neutral-500">+</span>
            </div>
          ))}
        </div>

        {/* 5번 인디케이터 */}
        <div className="flex justify-center items-center mt-2 h-[6px]">
          <div className="relative w-[55px] h-[6px] flex items-center justify-center">
            <img src={RectangleIcon} alt="" className="absolute w-full h-full object-contain" />
            <img 
              src={EllipseIcon} 
              alt="" 
              className="absolute w-auto h-full object-contain transition-transform duration-75 ease-out" 
              style={{ transform: `translateX(${(ratio5 * INDICATOR_MAX_DISTANCE) - (INDICATOR_MAX_DISTANCE/2)}px)` }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
