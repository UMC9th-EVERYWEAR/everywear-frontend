import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/src/components/common/Button';
import ProductCard from '@/src/components/common/ProductCard';
   
import { useRecentFittingsQuery, useHomeProductsQuery } from '@/src/hooks/queries/useHomeQueries';
import { QUERY_KEYS } from '../../constants/query-key';
import { PATH } from '../../constants/path';
import type { FittingSummary, ListDTO } from '../../apis/generated';
import ProductCardSkeleton from '../../components/common/ProductCardSkeleton';
import PartnerMallSection from '../../components/products/PartnerMallSection';
import MallGuide from '../../components/products/MallGuide';
import { LOGO_IMAGES } from '@/src/constants/images';

const INDICATOR_MAX_DISTANCE = 37;

const Home = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [showGuide, setShowGuide]  = useState(false);

	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCT.LIST });
		queryClient.invalidateQueries({ queryKey: QUERY_KEYS.FITTING.RECENT });
	}, [queryClient]);

	const { data: recentFittings, isLoading: isFittingLoading } = useRecentFittingsQuery();
	const { data: homeProducts, isLoading: isProductLoading } = useHomeProductsQuery();

	const [productScrollRatio, setProductScrollRatio] = useState(0);
	const productScrollRef = useRef<HTMLDivElement>(null);

	const [fittingScrollRatio, setFittingScrollRatio] = useState(0);
	const fittingScrollRef = useRef<HTMLDivElement>(null);

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

	if (showGuide) {
		return <MallGuide onClose={() => setShowGuide(false)} />;
	}

	return (
		<div className='flex flex-col w-full bg-white dark:bg-gray-900 pb-10 min-h-[calc(100vh-101px)] transition-colors duration-300'>
			
			{/* 1. 파트너 쇼핑몰 타이틀 */}
			<section className='px-4 pt-6 pb-2'> 
				<h2 className='text-[var(--color-neutral-900)] dark:text-white text-medium-16 mt-1 font-bold'>
					파트너 쇼핑몰
				</h2>
				<p className="text-[var(--color-neutral-700)] dark:text-gray-400 text-regular-12 tracking-[-0.36px]">
					유명 브랜드 가상 피팅가이드를 확인해보세요
				</p>
			</section>

			{/* 2. 파트너 쇼핑몰 리스트 */}
			<PartnerMallSection isHome/>

			{/* 3. 상품 추가 버튼 */}
			<section className="flex flex-col px-4 mt-4 gap-4">
				<button 
					onClick={()=>setShowGuide(true)}
					className="self-center text-center text-[var(--color-primary-300)] dark:text-primary-400 text-regular-10 tracking-[-0.3px] cursor-pointer"
				>
					유명 브랜드 가상 피팅 가이드
				</button>
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
						<h3 className="text-[var(--color-neutral-900)] dark:text-white text-medium-16 font-bold tracking-[-0.6px]">
							상품 둘러보기
						</h3>
						<button 
							className="text-medium-12 text-[var(--color-neutral-900)] dark:text-gray-300 cursor-pointer mb-1 hover:text-[var(--color-primary-600)] transition-colors"
							onClick={() => navigate(PATH.PRODUCTS.ROOT)}
						>
							전체보기 →
						</button>
					</div>
					<p className="text-[var(--color-neutral-700)] dark:text-gray-400 text-regular-12 mt-1">
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
							<ProductCardSkeleton
								key={i}
								isHome
							/>
						))
					) : productsList.length > 0 ? (
						productsList.map((product: ListDTO) => (
							<div
								key={product.product_id}
								className="min-w-[140px] shrink-0"
							>
								<ProductCard 
									id={product.product_id ?? 0}
									company={product.brand_name || '브랜드 정보 없음'}
									name={product.product_name || '상품명 없음'}
									price={product.price || ''}
									imageUrl={product.product_img_url || ''}
									rating={product.star_point || 0}
								/>
							</div>
						))
					) : (
						<div className="w-full py-10 flex flex-col items-center justify-center border-2 border-dashed border-neutral-100 dark:border-gray-700 rounded-[10px]">
							<span className="text-neutral-400 dark:text-gray-500 text-regular-12 text-center">
								등록된 상품이 없습니다.<br/>새로운 상품을 추가해보세요!
							</span>
						</div>
					)}
				</div>

				<div className="flex justify-center items-center mt-2 h-[12px]">
					<div className="relative flex items-center justify-center w-[55px] h-[6px]">
						<img
							src={LOGO_IMAGES.RECTANGLE}
							alt=""
							className="absolute w-full h-full object-contain dark:opacity-50"
						/>
						<img 
							src={LOGO_IMAGES.ELLIPSE} 
							alt="" 
							className="absolute w-auto h-full object-contain transition-transform duration-75 ease-out dark:brightness-150" 
							style={{
								transform: `translateX(${(productScrollRatio * INDICATOR_MAX_DISTANCE) - (INDICATOR_MAX_DISTANCE / 2)}px)`,
							}}
						/>
					</div>
				</div>
			</section>

			{/* 5. 최근 피팅 내역 섹션 */}
			<section className="mt-12 pb-10">
				<div className="px-4 mb-4">
					<div className="flex justify-between items-end">
						<h3 className="text-[var(--color-neutral-900)] dark:text-white text-medium-16 font-bold tracking-[-0.6px]">
							최근 피팅 내역
						</h3>
						<button 
							className="text-medium-12 text-[var(--color-neutral-900)] dark:text-gray-300 cursor-pointer mb-1 hover:text-[var(--color-primary-600)] transition-colors"
							onClick={() => navigate(PATH.RECENT_FITTING)} 
						>
							자세히보기 →
						</button>
					</div>
					<p className="text-[var(--color-neutral-700)] dark:text-gray-400 text-regular-12 mt-1">
						최근 피팅 내역을 확인해보세요
					</p>
				</div>

				<div 
					ref={fittingScrollRef}
					onScroll={handleFittingScroll}
					className="flex gap-3 overflow-x-auto no-scrollbar pb-4 px-4 items-start"
				>
					{isFittingLoading ? (
						[1, 2, 3].map((i) => (
							<ProductCardSkeleton
								key={i}
								isHome
							/>
						))
					) : recentFittings && recentFittings.length > 0 ? (
						recentFittings.map((fitting: FittingSummary) => (
							<button
								key={fitting.fittingId}
								onClick={() =>
									navigate(
										PATH.FITTING_DETAIL.replace(':id', String(fitting.fittingId)),
									)
								}
								className="flex flex-col items-center min-w-[140px] max-w-[200px] w-full shrink-0 cursor-pointer active:scale-[0.98] transition-transform outline-none"
							>
								<div className="w-full h-[210px] rounded-[10px] overflow-hidden bg-[var(--color-neutral-100)] dark:bg-neutral-800 shadow-sm border border-black/5 dark:border-white/5">
									<img
										src={fitting.fittingResultImage || '/images/default-product.png'}
										alt="피팅 결과"
										className="w-full h-full object-cover transition-transform duration-200 ease-in-out hover:scale-105"
									/>
								</div>
							</button>
						))
					) : (
						<div className="w-full py-10 flex flex-col items-center justify-center border-2 border-dashed border-neutral-100 dark:border-gray-700 rounded-[10px]">
							<span className="text-neutral-400 dark:text-gray-500 text-regular-12 text-center">
								피팅 내역이 없습니다.<br/>새로운 피팅을 시작해보세요!
							</span>
						</div>
					)}
				</div>

				<div className="flex justify-center items-center mt-2 h-[12px]">
					<div className="relative flex items-center justify-center w-[55px] h-[6px]">
						<img
							src={LOGO_IMAGES.RECTANGLE}
							alt=""
							className="absolute w-full h-full object-contain dark:opacity-40"
						/>
						<img 
							src={LOGO_IMAGES.ELLIPSE} 
							alt="" 
							className="absolute w-auto h-full object-contain transition-transform duration-75 ease-out dark:brightness-150" 
							style={{
								transform: `translateX(${(fittingScrollRatio * INDICATOR_MAX_DISTANCE) - (INDICATOR_MAX_DISTANCE / 2)}px)`,
							}}
						/>
					</div>
				</div>
			</section>


		</div>
	);
};

export default Home;
