import Skeleton from './Skeleton';


const ProductCardSkeleton = ({ isCloset = false }: { isCloset?: boolean }) => {
	return (
		<div className="flex flex-col items-center w-40 shrink-0">
			{/* 1. 이미지 영역 */}
			<div className="w-full h-44 rounded-lg overflow-hidden bg-neutral-200 animate-pulse" />

			{/* 2. 정보 카드 */}
			<div
				className="w-full p-2.5 -mt-8 z-10 flex flex-col bg-white rounded-b-xl shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]"
			>
				{/* 회사명 & 별점 */}
				<div className="flex justify-between items-center">
					<Skeleton className="h-2.5 w-12 rounded" />
					<div className="flex items-center gap-1">
						<Skeleton className="w-3 h-3 rounded-full" />
						<Skeleton className="h-2.5 w-5 rounded" />
					</div>
				</div>

				{/* 상품명 */}
				<Skeleton className="mt-1 h-3.5 w-full rounded" />

				{/* 가격 */}
				<Skeleton className="mt-1 h-3 w-16 rounded" />

				{/* 버튼 영역 (내 옷장 페이지) */}
				{isCloset && (
					<div className="mt-2.5 flex justify-between w-full">
						<Skeleton className="w-16 h-6 rounded-lg" />
						<Skeleton className="w-16 h-6 rounded-lg" />
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductCardSkeleton;
