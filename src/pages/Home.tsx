import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/src/components/common/Button';
import MusinsaLogo from '@/public/svgs/LogoImages/MusinsaLogo.svg';
import ZigzagLogo from '@/public/svgs/LogoImages/ZigzagLogo.png';
import Logo29cm from '@/public/svgs/LogoImages/29cmLogo.svg';
import WLogo from '@/public/svgs/LogoImages/WLogo.svg';
import ProductCard from '@/src/components/common/ProductCard';
import RectangleIcon from '@/public/svgs/LogoImages/Rectangle.svg'; 
import EllipseIcon from '@/public/svgs/LogoImages/Ellipse.svg';     
import { MALL_LINKS } from '../constants/link';
import { useRecentFittingsQuery, useHomeProductsQuery } from '@/src/hooks/queries/useHomeQueries';

const Home = () => {
  const navigate = useNavigate();

  const { data: recentFittings, isLoading: isFittingLoading } = useRecentFittingsQuery();
  const { data: homeProducts, isLoading: isProductLoading } = useHomeProductsQuery();

  const [productScrollRatio, setProductScrollRatio] = useState(0);
  const productScrollRef = useRef<HTMLDivElement>(null);

  const [fittingScrollRatio, setFittingScrollRatio] = useState(0);
  const fittingScrollRef = useRef<HTMLDivElement>(null);

  // ✅ 이미 배열로 내려오므로 그대로 사용
  const productsList = homeProducts ?? [];

  const handleProductScroll = () => {
    if (productScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = productScrollRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft > 0) setProductScrollRatio(scrollLeft / maxScrollLeft);
    }
  };

  const handleFittingScroll = () => {
    if (fittingScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = fittingScrollRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      if (maxScrollLeft > 0) setFittingScrollRatio(scrollLeft / maxScrollLeft);
    }
  };

  const INDICATOR_MAX_DISTANCE = 37;

  return (
    <div className='flex flex-col w-full bg-white pb-10 min-h-[calc(100vh-101px)]'>
      {/* 1. 상단 섹션 */}
      <section className='px-4 pt-10 pb-2'> 
        <h2 className='text-[var(--color-neutral-900)] text-medium-16 mt-1 font-bold'>
          파트너 쇼핑몰
        </h2>
        <p className="text-[var(--color-neutral-700)] text-regular-12 tracking-[-0.36px]">
          유명 브랜드 가상 피팅가이드를 확인해보세요
        </p>
      </section>

      {/* 2. 파트너 쇼핑몰 */}
      <section className="flex gap-2 px-4 py-4 bg-white overflow-x-auto no-scrollbar">
        {[
          { url: MALL_LINKS.MUSINSA.url, src: MusinsaLogo, alt: "무신사", bg: "bg-black" },
          { url: MALL_LINKS.ZIGZAG.url, src: ZigzagLogo, alt: "지그재그", bg: "bg-[#E592FF]" },
          { url: MALL_LINKS.CM.url, src: Logo29cm, alt: "29CM", bg: "bg-black" },
          { url: MALL_LINKS.WCONCEPT.url, src: WLogo, alt: "W컨셉", bg: "bg-white border border-[var(--color-neutral-100)]" }
        ].map((mall, idx) => (
          <a
            key={idx}
            href={mall.url}
            target="_blank"
            rel="noreferrer"
            className={`w-[75px] h-[75px] ${mall.bg} rounded-[6px] flex items-center justify-center overflow-hidden shrink-0`}
          >
            <img src={mall.src} alt={mall.alt} className="w-full h-full object-contain p-1" />
          </a>
        ))}
      </section>

      {/* 3. 가상 피팅 가이드 & 상품 추가 */}
      <section className="flex flex-col px-4 mt-4 gap-4">
        <span className="self-center text-center text-[var(--color-primary-300)] text-regular-10 tracking-[-0.3px] cursor-pointer">
          유명 브랜드 가상 피팅 가이드
        </span>
        <div className="w-full">
          <Button 
            variant="filled" 
            size="xl" 
            onClick={() => navigate('/products/add')}
          >
            상품 추가하기
          </Button>
        </div>
      </section>

      {/* 4. 상품 둘러보기 섹션 */}
      <section className="mt-10">
        <div className="px-4 mb-4">
          <div className="flex justify-between items-end">
            <h3 className="text-[var(--color-neutral-900)] text-medium-16 font-bold tracking-[-0.6px]">
              상품 둘러보기
            </h3>
            <span className="text-medium-12 text-[var(--color-neutral-900)] cursor-pointer mb-1">
              전체보기 →
            </span>
          </div>
          <p className="text-[var(--color-neutral-700)] text-regular-12 mt-[-4px]">
            다양한 쇼핑몰의 상품을 한 곳에서 확인하세요
          </p>
        </div>

        <div 
          ref={productScrollRef}
          onScroll={handleProductScroll}
          className="flex gap-3 overflow-x-auto no-scrollbar pb-4 px-4"
        >
          {isProductLoading ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="min-w-[140px] h-[200px] bg-neutral-100 rounded-[10px] animate-pulse"
              />
            ))
          ) : productsList.length > 0 ? (
            productsList.map((product: any) => (
              <div
                key={product.id || product.productId}
                className="min-w-[140px] shrink-0"
              >
                <ProductCard 
                  id={product.id || product.productId}
                  company={product.brand_name || product.brandName || '브랜드 정보 없음'}
                  name={product.product_name || product.name || '상품명 없음'}
                  price={product.price || 0}
                  imageUrl={
                    product.product_img_url ||
                    product.product_image_url ||
                    product.imageUrl
                  }
                  rating={product.rating || 0}
                />
              </div>
            ))
          ) : (
            <div className="w-full py-10 flex flex-col items-center justify-center border-2 border-dashed border-neutral-100 rounded-[10px]">
              <span className="text-neutral-400 text-regular-12 text-center">
                등록된 상품이 없습니다.<br/>새로운 상품을 추가해보세요!
              </span>
            </div>
          )}
        </div>

        {/* 인디케이터 */}
        <div className="flex justify-center items-center mt-2 h-[12px]">
          <div className="relative flex items-center justify-center w-[55px] h-[6px]">
            <img src={RectangleIcon} alt="" className="absolute w-full h-full object-contain" />
            <img 
              src={EllipseIcon} 
              alt="" 
              className="absolute w-auto h-full object-contain transition-transform duration-75 ease-out" 
              style={{
                transform: `translateX(${(productScrollRatio * INDICATOR_MAX_DISTANCE) - (INDICATOR_MAX_DISTANCE / 2)}px)`
              }}
            />
          </div>
        </div>
      </section>

      {/* 5. 최근 피팅 내역 섹션 */}
      <section className="mt-12 pb-10">
        <div className="px-4 mb-4">
          <div className="flex justify-between items-end">
            <h3 className="text-[var(--color-neutral-900)] text-medium-16 font-bold tracking-[-0.6px]">
              최근 피팅 내역
            </h3>
            <span className="text-medium-12 text-[var(--color-neutral-900)] cursor-pointer mb-1">
              전체보기 →
            </span>
          </div>
          <p className="text-[var(--color-neutral-700)] text-regular-12 mt-[-4px]">
            최근 피팅 내역을 확인해보세요
          </p>
        </div>

        <div 
          ref={fittingScrollRef}
          onScroll={handleFittingScroll}
          className="flex gap-3 overflow-x-auto no-scrollbar pb-4 px-4"
        >
          {isFittingLoading ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="min-w-[137px] h-[182px] bg-neutral-100 rounded-[10px] animate-pulse"
              />
            ))
          ) : recentFittings && recentFittings.length > 0 ? (
            recentFittings.map((fitting: any) => (
              <div 
                key={fitting.id} 
                className="min-w-[137px] h-[182px] bg-neutral-100 rounded-[10px] overflow-hidden shrink-0 cursor-pointer active:opacity-80 transition-opacity"
              >
                <img 
                  src={fitting.fittingImageUrl || fitting.imageUrl} 
                  alt="피팅 결과" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="w-full py-10 flex flex-col items-center justify-center border-2 border-dashed border-neutral-100 rounded-[10px]">
              <span className="text-neutral-400 text-regular-12 text-center">
                피팅 내역이 없습니다.<br/>새로운 피팅을 시작해보세요!
              </span>
            </div>
          )}
        </div>

        {/* 인디케이터 */}
        <div className="flex justify-center items-center mt-2 h-[12px]">
          <div className="relative flex items-center justify-center w-[55px] h-[6px]">
            <img src={RectangleIcon} alt="" className="absolute w-full h-full object-contain" />
            <img 
              src={EllipseIcon} 
              alt="" 
              className="absolute w-auto h-full object-contain transition-transform duration-75 ease-out" 
              style={{
                transform: `translateX(${(fittingScrollRatio * INDICATOR_MAX_DISTANCE) - (INDICATOR_MAX_DISTANCE / 2)}px)`
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
