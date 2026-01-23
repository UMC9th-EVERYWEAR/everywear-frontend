import RectangleIcon from '@/public/svgs/LogoImages/Rectangle.svg';
import EllipseIcon from '@/public/svgs/LogoImages/Ellipse.svg';
import { useHorizontalScrollIndicator } from '@/src/shared/hooks/useHorizontalScrollIndicator';

const INDICATOR_MAX_DISTANCE = 37;

const RecentFittingSection = () => {
	const { scrollRef, scrollRatio, handleScroll } = useHorizontalScrollIndicator();

	return (
		<section className="mt-12 pb-10">
			<div className="px-4 mb-4">
				<div className="flex justify-between items-end">
					<h3 className="text-[#2A323F] text-[20px] font-[500] leading-[150%] tracking-[-0.6px]">
						최근 피팅 내역
					</h3>
					<span className="text-[12px] text-[#000000] font-medium cursor-pointer mb-1">
						전체보기 →
					</span>
				</div>
				<p className="text-[#596373] text-[12px] font-[400] mt-[-4px]">
					최근 피팅 내역을 확인해보세요
				</p>
			</div>

			<div
				ref={scrollRef}
				onScroll={handleScroll}
				className="flex gap-[83px] overflow-x-auto no-scrollbar pb-4 px-4"
			>
				{[1, 2, 3].map((i) => (
					<div
						key={i}
						className="min-w-[137px] h-[182px] bg-[#D2D2D2] rounded-[10px] flex items-center justify-center shrink-0 cursor-pointer active:opacity-80 transition-opacity"
					>
						<span className="text-2xl text-neutral-500 font-light">+</span>
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

export default RecentFittingSection;
