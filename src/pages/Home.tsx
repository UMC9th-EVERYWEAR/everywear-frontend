import { useRef, useState } from 'react';
import { Button } from '@/src/components/common/Button';
// import MusinsaLogo from '@/public/svgs/LogoImages/MusinsaLogo.svg';
import ZigzagLogo from '@/public/svgs/LogoImages/ZigzagLogo.png';
import Logo29cm from '@/public/svgs/LogoImages/29cmLogo.svg';
import WLogo from '@/public/svgs/LogoImages/WLogo.svg';
import ProductCard from '@/src/components/common/ProductCard';
import RectangleIcon from '@/public/svgs/LogoImages/Rectangle.svg'; 
import EllipseIcon from '@/public/svgs/LogoImages/Ellipse.svg';     
import { MALL_LINKS } from '../constants/link';


const products = [
	{ id: 1, company: '무신사', name: '오버핏 후드티', price: 39000, rating: 4.5, imageUrl: 'https://via.placeholder.com/300' },
	{ id: 2, company: '지그재그', name: '와이드 슬랙스', price: 49000, rating: 4.2, imageUrl: 'https://via.placeholder.com/300' },
	{ id: 3, company: '29CM', name: '니트 가디건', price: 59000, rating: 4.8, imageUrl: 'https://via.placeholder.com/300' },
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
		<div className='flex flex-col w-full bg-white pb-10 min-h-[calc(100vh-101px)]'>
      
			{/* 1. 상단 섹션 */}
			<section className='px-4 pt-10 pb-2'> 
				<h2 className='text-[var(--color-neutral-900)] text-medium-16 mt-1'>
					파트너 쇼핑몰
				</h2>
				<p className="text-[var(--color-neutral-700)] text-regular-12 tracking-[-0.36px]">
					유명 브랜드 가상 피팅가이드를 확인해보세요
				</p>
			</section>

			{/* 2. 파트너 쇼핑몰 */}
			<section className="flex gap-2 px-6 py-4 bg-white">
				<a
					href={MALL_LINKS.MUSINSA.url}				
					className="w-[75px] h-[75px] bg-black rounded-[6px] flex items-center justify-center overflow-hidden shrink-0"
				>
					<img
						src="/svgs/LogoImages/MusinsaLogo.svg"
						alt="무신사"
						className="w-full h-full object-contain"
					/>
				</a>
				<a
					href={MALL_LINKS.ZIGZAG.url}
					className="w-[75px] h-[75px] bg-[#E592FF] rounded-[6px] flex items-center justify-center overflow-hidden shrink-0"
				>
					<img
						src={ZigzagLogo}
						alt="지그재그"
						className="w-full h-full object-contain"
					/>
				</a>
				<a
					href={MALL_LINKS.CM.url}				
					className="w-[75px] h-[75px] bg-black rounded-[6px] flex items-center justify-center overflow-hidden shrink-0"
				>
					<img
						src={Logo29cm}
						alt="29CM"
						className="w-full h-full object-contain p-1"
					/> 
				</a>
				<a
					href={MALL_LINKS.WCONCEPT.url}				
					className="w-[75px] h-[75px] bg-white border border-[var(--color-neutral-100)] rounded-[6px] flex items-center justify-center overflow-hidden shrink-0"
				>
					<img
						src={WLogo}
						alt="W컨셉"
						className="w-full h-full object-contain"
					/>
				</a>
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
					>
						상품 추가하기
					</Button>
				</div>
			</section>


			{/* 4. 상품 둘러보기 섹션 */}
			<section className="mt-10">
				<div className="px-4 mb-4">
					<div className="flex justify-between items-end">
						<h3 className="text-[var(--color-neutral-900)] text-medium-16 font-bold tracking-[-0.6px]">상품 둘러보기</h3>
						<span className="text-medium-12 text-[var(--color-neutral-900)] cursor-pointer mb-1">전체보기 →</span>
					</div>
					<p className="text-[var(--color-neutral-700)] text-regular-12 mt-[-4px]">다양한 쇼핑몰의 상품을 한 곳에서 확인하세요</p>
				</div>
  
				<div 
					ref={productScrollRef}
					onScroll={handleProductScroll}
					className="flex gap-[10px] overflow-x-auto no-scrollbar pb-4 px-4"
				>
					{products.map((product) => (
						<div
							key={product.id}
							className="min-w-[calc((100%-20px)/3)] shrink-0"
						>
							<ProductCard {...product} />
						</div>
					))}
				</div>

				{/* 4번 인디케이터 */}
				<div className="flex justify-center items-center mt-2 h-[12px]">
					<div className="relative flex items-center justify-center w-[55px] h-[6px]">
						<img
							src={RectangleIcon}
							alt=""
							className="absolute w-full h-full object-contain"
						/>
						<img 
							src={EllipseIcon} 
							alt="" 
							className="absolute w-auto h-full object-contain transition-transform duration-75 ease-out" 
							style={{ transform: `translateX(${(productScrollRatio * INDICATOR_MAX_DISTANCE) - (INDICATOR_MAX_DISTANCE/2)}px)` }}
						/>
					</div>
				</div>
			</section>

			{/* 5. 최근 피팅 내역 섹션 */}
			<section className="mt-12 pb-10">
				<div className="px-4 mb-4">
					<div className="flex justify-between items-end">
						<h3 className="text-[var(--color-neutral-900)] text-medium-16 font-bold tracking-[-0.6px]">최근 피팅 내역</h3>
						<span className="text-medium-12 text-[var(--color-neutral-900)] cursor-pointer mb-1">전체보기 →</span>
					</div>
					<p className="text-[var(--color-neutral-700)] text-regular-12 mt-[-4px]">최근 피팅 내역을 확인해보세요</p>
				</div>

				<div 
					ref={fittingScrollRef}
					onScroll={handleFittingScroll}
					className="flex gap-[83px] overflow-x-auto no-scrollbar pb-4 px-4" 
				>
					{[1, 2, 3].map((i) => (
						<div 
							key={i} 
							className="min-w-[137px] h-[182px] bg-[var(--color-neutral-1000)] rounded-[10px] flex items-center justify-center shrink-0 cursor-pointer active:opacity-80 transition-opacity"
						>
							<span className="text-2xl text-[var(--color-neutral-700)] font-light">+</span>
						</div>
					))}
				</div>

				{/* 5번 인디케이터 */}
				<div className="flex justify-center items-center mt-2 h-[12px]">
					<div className="relative flex items-center justify-center w-[55px] h-[6px]">
						<img
							src={RectangleIcon}
							alt=""
							className="absolute w-full h-full object-contain"
						/>
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
