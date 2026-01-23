import RectangleIcon from '@/public/svgs/LogoImages/Rectangle.svg';
import EllipseIcon from '@/public/svgs/LogoImages/Ellipse.svg';
import ProductCard from '@/src/shared/components/common/ProductCard';
import { useHorizontalScrollIndicator } from '@/src/shared/hooks/useHorizontalScrollIndicator';

const products = [
	{ id: 1, company: '무신사', name: '오버핏 후드티', price: '₩39,000', rating: 4.5, imageUrl: 'https://via.placeholder.com/300' },
	{ id: 2, company: '지그재그', name: '와이드 슬랙스', price: '₩49,000', rating: 4.2, imageUrl: 'https://via.placeholder.com/300' },
	{ id: 3, company: '29CM', name: '니트 가디건', price: '₩59,000', rating: 4.8, imageUrl: 'https://via.placeholder.com/300' },
];

const INDICATOR_MAX_DISTANCE = 37;

const BrowseProductsSection = () => {
  
	const { scrollRef, scrollRatio, handleScroll } = useHorizontalScrollIndicator();

	return (
		<section className="mt-10">
			<div className="px-4 mb-4">
				<div className="flex justify-between items-end">
					<h3 className="text-[#2A323F] text-[20px] font-[500] leading-[150%] tracking-[-0.6px]">
						상품 둘러보기
					</h3>
					<span className="text-[12px] text-[#2A323F] font-medium cursor-pointer mb-1">
						전체보기 →
					</span>
				</div>
				<p className="text-[#596373] text-[12px] font-[400] mt-[-4px]">
					다양한 쇼핑몰의 상품을 한 곳에서 확인하세요
				</p>
			</div>

			<div
				ref={scrollRef}
				onScroll={handleScroll}
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
						style={{
							transform: `translateX(${scrollRatio * INDICATOR_MAX_DISTANCE - INDICATOR_MAX_DISTANCE / 2}px)`,
						}}
					/>
				</div>
			</div>
		</section>
	);
};

export default BrowseProductsSection;
