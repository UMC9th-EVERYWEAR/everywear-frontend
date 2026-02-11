import { cn } from '@/src/utils/cn';
import { useNavigate } from 'react-router';

export interface ProductCardProps {
    id: number; 
    company: string;
    name: string;
    price: string;
    rating: number;
    imageUrl: string;
    isCloset?: boolean;
    productUrl?: string; 
}

const StarIcon = () => (
	<svg
		width="8.3"
		height="7.9"
		viewBox="0 0 9 8"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M1.59375 7.91667L2.27083 4.98958L0 3.02083L3 2.76042L4.16667 0L5.33333 2.76042L8.33333 3.02083L6.0625 4.98958L6.73958 7.91667L4.16667 6.36458L1.59375 7.91667Z"
			fill="var(--color-neutral-900)"
		/>
	</svg>
);

const ButtonClassName = cn(
	'flex justify-center items-center',
	'p-1 border rounded-lg border-none shrink-0',
	'bg-[var(--color-primary-600)] text-[var(--color-neutral-50)]',
	'text-medium-12 cursor-pointer transition-colors',
	'hover:bg-[var(--color-primary-700)]',
	'flex-1',
);
                          
const ProductCard = ({ 
	id, 
	company, 
	name, 
	price, 
	rating = 0, 
	imageUrl, 
	isCloset = false ,
	productUrl,
}: ProductCardProps) => {
 
	const navigate = useNavigate();

	// 카드 클릭 시 핸들러
	const handleCardClick = () => {
		if (id) {
			navigate(`/ai-fitting/${id}`);
		} else {
			console.warn('상품 ID가 없어 상세 페이지로 이동할 수 없습니다.');
		}
	};

	// 구매하기 버튼 클릭 시 핸들러
	const handlePurchase = () => {
		if (productUrl) window.open(productUrl);
	}

	const handleRecentFitting = () => {
		if (id) {
			navigate(`/recent-fiitng/${id}`)
		}
	}

	return (
		<button 
			onClick={handleCardClick}
			className="flex flex-col items-center min-w-10 max-w-[200px] w-full shrink-0 cursor-pointer active:scale-[0.98] transition-transform"
		>
      
			{/* 1. 이미지 영역 */}
			<div className="w-full h-[178px] rounded-[10px] overflow-hidden bg-[var(--color-neutral-100)]">
				<img
					src={imageUrl || '/images/default-product.png'} // 이미지 없을 때 기본 이미지 처리
					alt={name}
					className="w-full h-full object-cover transition-transform duration-200 ease-in-out hover:scale-110"
				/>
			</div>

			{/* 2. 정보 카드 */}
			<div
				className="w-full p-2.5 -mt-[34px] z-10 flex flex-col bg-white rounded-b-xl shadow-[var(--shadow-4)]"
			>
				{/* 회사명 & 별점 */}
				<div className="flex justify-between items-center text-regular-10">
					<span className="text-[var(--color-neutral-500)] font-pretandard truncate max-w-[70px]">
						{company || '브랜드'}
					</span>
					<div className="flex items-center">
						<div className="flex items-center justify-center w-[14px] h-[14px]">
							<StarIcon />
						</div>
						<span className="text-[var(--color-neutral-900)] ml-0.5">
							{rating}
						</span>
					</div>
				</div>

				{/* 상품명 */}
				<h3 className="w-full text-start overflow-hidden text-[var(--color-neutral-900)] text-regular-14 leading-[21px] whitespace-nowrap text-ellipsis mt-0.5">
					{name || '상품명 없음'}
				</h3>

				{/* 가격 - NaN 방지 로직 적용 */}
				<p className="overflow-hidden text-start  text-[var(--color-neutral-900)] text-medium-12 leading-[18px] whitespace-nowrap">
					{price || '0원'}
				</p>

				{/* 구매하기 & AI 분석하기 버튼 (내 옷장 페이지 전용) */}
				{isCloset && (
					<div className={cn('w-full flex gap-2 mt-2')}>
						<button
							className={ButtonClassName}
							onClick={(e) => {
								e.stopPropagation(); 
								handlePurchase();
							}}
						>
							구매하기
						</button>
						<button
							className={ButtonClassName}
							onClick={(e) => {
								e.stopPropagation(); 
								handleRecentFitting();
							}}
						>
							AI 분석하기
						</button>
					</div>
				)}
			</div>
		</button>
	);
};

export default ProductCard;
