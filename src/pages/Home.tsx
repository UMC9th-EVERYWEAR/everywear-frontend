import { useRef, useState } from 'react';
import { Button } from '../components/common/Button';
import MusinsaLogo from "../../public/LogoImages/MusinsaLogo.svg";
import ZigzagLogo from "../../public/LogoImages/ZigzagLogo.png";
import Logo29cm from "../../public/LogoImages/29cmLogo.svg";
import WLogo from "../../public/LogoImages/WLogo.svg";
import ProductCard from '../components/common/ProductCard';
import RectangleIcon from "../../public/LogoImages/Rectangle.svg"; 
import EllipseIcon from "../../public/LogoImages/Ellipse.svg";     


const products = [
  { id: 1, company: "무신사", name: "오버핏 후드티", price: "₩39,000", rating: 4.5, imageUrl: "https://via.placeholder.com/300" },
  { id: 2, company: "지그재그", name: "와이드 슬랙스", price: "₩49,000", rating: 4.2, imageUrl: "https://via.placeholder.com/300" },
  { id: 3, company: "29CM", name: "니트 가디건", price: "₩59,000", rating: 4.8, imageUrl: "https://via.placeholder.com/300" },
];

const Home = () => {
  const [productScrollRatio, setProductScrollRatio] = useState(0);
  const productScrollRef = useRef<HTMLDivElement>(null);

  const handleProductScroll = () => {
    if (productScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = productScrollRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft > 0) setProductScrollRatio(scrollLeft / maxScrollLeft);
    }
  };

  const [fittingScrollRatio, setFittingScrollRatio] = useState(0);
  const fittingScrollRef = useRef<HTMLDivElement>(null);

  const handleFittingScroll = () => {
    if (fittingScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = fittingScrollRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft > 0) setFittingScrollRatio(scrollLeft / maxScrollLeft);
    }
  };

  const INDICATOR_MAX_DISTANCE = 37;

  return (
    <div className="flex flex-col w-full bg-white pb-10">
      
      {/* 1. 상단 섹션 */}
      <section className="px-4 pt-6 pb-2">
        <h2 className="text-[#000000] text-[20px] font-[500] leading-normal mt-1">
          파트너 쇼핑몰
        </h2>
        <p className="text-[#596373] text-[12px] font-[400] leading-[150%] tracking-[-0.36px]">
          유명 브랜드 가상 피팅가이드를 확인해보세요
        </p>
      </section>

      {/* 2. 파트너 쇼핑몰 - 크기 고정 및 9px 패딩 적용 */}
      <section className="flex justify-between px-6 py-4 bg-white">
        <div className="w-[75px] h-[75px] bg-black rounded-[6px] flex items-center justify-center overflow-hidden shrink-0">
          <img src={MusinsaLogo} alt="무신사" className="w-full h-full object-contain" />
        </div>
        <div className="w-[75px] h-[75px] bg-[#E592FF] rounded-[6px] flex items-center justify-center overflow-hidden shrink-0">
          <img src={ZigzagLogo} alt="지그재그" className="w-full h-full object-contain" />
        </div>
        <div className="w-[75px] h-[75px] bg-black rounded-[6px] flex items-center justify-center overflow-hidden shrink-0">
          <img src={Logo29cm} alt="29CM" className="w-full h-full object-contain p-1" /> 
        </div>
        <div className="w-[75px] h-[75px] bg-white border border-[#F1F1F1] rounded-[6px] flex items-center justify-center overflow-hidden shrink-0">
          <img src={WLogo} alt="W컨셉" className="w-full h-full object-contain" />
        </div>
      </section>

      {/* 3. 가상 피팅 가이드 & 상품 추가 */}
      <section className="flex flex-col px-4 mt-4 gap-4">
        <span className="self-center text-center text-[#8D98FF] text-[10px] font-[400] leading-[150%] tracking-[-0.3px] cursor-pointer">
          유명 브랜드 가상 피팅 가이드
        </span>


        <div className="w-full">
        <Button variant="filled" size="xl">
          상품 추가하기
        </Button>
      </div>

      </section>


     {/* 4. 상품 둘러보기 섹션 - 3개 노출 버전 */}
    <section className="mt-10">
      <div className="px-4 mb-4">
        <div className="flex justify-between items-end">
          <h3 className="text-[#2A323F] text-[20px] font-[500] leading-[150%] tracking-[-0.6px]">상품 둘러보기</h3>
          <span className="text-[12px] text-[#2A323F] font-medium cursor-pointer mb-1">전체보기 →</span>
        </div>
        <p className="text-[#596373] text-[12px] font-[400] mt-[-4px]">다양한 쇼핑몰의 상품을 한 곳에서 확인하세요</p>
      </div>
  
        <div 
          ref={productScrollRef}
          onScroll={handleProductScroll}
          className="flex gap-[10px] overflow-x-auto no-scrollbar pb-4 px-4"
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[calc((100%-20px)/3)] shrink-0">
              <ProductCard {...product} />
            </div>
          ))}
        </div>

  {/* 4번 인디케이터 (기존 로직 유지) */}
  <div className="flex justify-center items-center mt-2 h-[12px]">
    <div className="relative flex items-center justify-center w-[55px] h-[6px]">
      <img src={RectangleIcon} alt="" className="absolute w-full h-full object-contain" />
      <img 
        src={EllipseIcon} 
        alt="" 
        className="absolute w-auto h-full object-contain transition-transform duration-75 ease-out" 
        style={{ transform: `translateX(${(productScrollRatio * INDICATOR_MAX_DISTANCE) - (INDICATOR_MAX_DISTANCE/2)}px)` }}
      />
    </div>
  </div>
</section>
{/* 5. 최근 피팅 내역 섹션 - 이전 박스 크기(137x182) 복구 버전 */}
<section className="mt-12 pb-10">
  <div className="px-4 mb-4">
    <div className="flex justify-between items-end">
      <h3 className="text-[#2A323F] text-[20px] font-[500] leading-[150%] tracking-[-0.6px]">최근 피팅 내역</h3>
      {/* 텍스트 검정색 및 화살표 적용 */}
      <span className="text-[12px] text-[#000000] font-medium cursor-pointer mb-1">전체보기 →</span>
    </div>
    <p className="text-[#596373] text-[12px] font-[400] mt-[-4px]">최근 피팅 내역을 확인해보세요</p>
  </div>

  {/* 스크롤 영역: 상품 섹션과 시작점(px-4) 및 간격(gap-10) 통일 */}
  <div 
    ref={fittingScrollRef}
    onScroll={handleFittingScroll}
    className="flex gap-[80px] overflow-x-auto no-scrollbar pb-4 px-4"
  >
    {[1, 2, 3].map((i) => (
      <div 
        key={i} 
        /* ⭐ 재범님이 말씀하신 이전 고정 크기(137px x 182px)로 복구! */
        className="min-w-[137px] h-[182px] bg-[#D2D2D2] rounded-[10px] flex items-center justify-center shrink-0 cursor-pointer active:opacity-80 transition-opacity"
      >
        {/* 중앙 + 아이콘 */}
        <span className="text-2xl text-neutral-500 font-light">+</span>
      </div>
    ))}
  </div>

  {/* 5번 인디케이터 (상품 섹션과 로직 통일) */}
  <div className="flex justify-center items-center mt-2 h-[12px]">
    <div className="relative flex items-center justify-center w-[55px] h-[6px]">
      <img src={RectangleIcon} alt="" className="absolute w-full h-full object-contain" />
      <img 
        src={EllipseIcon} 
        alt="" 
        className="absolute w-auto h-full object-contain transition-transform duration-75 ease-out" 
        style={{ transform: `translateX(${(fittingScrollRatio * INDICATOR_MAX_DISTANCE) - (INDICATOR_MAX_DISTANCE/2)}px)` }}
      />
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;