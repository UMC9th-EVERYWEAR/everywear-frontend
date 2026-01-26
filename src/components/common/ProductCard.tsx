import { formatPrice } from '@/src/utils/formatPrice';

export interface ProductCardProps {
    id: number; 
    company: string;
    name: string;
    price: number;
    rating: number;
    imageUrl: string;
    isCloset?: boolean;
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
			fill="#2A323F"
		/>
	</svg>
);

// 구매하기 & AI 분석하기 버튼 CSS 변수 선언
const ButtonClassName = 'flex justify-center w-16 p-1  tracking-[-2px] leading-4.5\
                          items-center border rounded-lg border-none bg-primary-600 shrink-0 \
						  text-medium-12 text-white cursor-pointer font-anonymous'

const ProductCard = ({ company, name, price, rating, imageUrl, isCloset = false }: ProductCardProps) => {
	return (
		<div className="flex flex-col items-center w-[160px] shrink-0 cursor-pointer active:scale-[0.98] transition-transform">
      
			{/* 1. 이미지 영역 (137 x 178) */}
			<div className="w-full h-[178px] rounded-[10px] overflow-hidden bg-[#F2F2F2]">
				<img
					src={imageUrl}
					alt={name}
					className="w-full h-full object-cover"
				/>
			</div>

			{/* 2. 정보 카드 (137 x 67, 위로 -34px 겹침) */}
			<div
				className="w-full p-2.5 -mt-[34px] z-10 flex flex-col bg-white rounded-b-xl shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]"
			>

				{/* 회사명 & 별점 */}
				<div className="flex justify-between items-center text-regular-10">
					<span className="text-[#767676] font-anonymous">
						{company}
					</span>
					<div className="flex items-center">
						<div className="flex items-center justify-center w-[14px] h-[14px]">
							<StarIcon />
						</div>
						<span className="text-neutral-900">
							{rating}
						</span>
					</div>
				</div>

 
				{/* 상품명 */}
				<h3 className="w-full overflow-hidden text-neutral-900 text-regular-14 leading-[21px] whitespace-nowrap text-ellipsis">
					{name}
				</h3>

				{/* 가격 */}
				<p className="overflow-hidden text-[#2A323F] text-[12px] leading-[18px] whitespace-nowrap font-anonymous">
					{formatPrice(price)}원
				</p>

				{/* 구매하기 & AI 분석하기 버튼(내 옷장 페이지에서만 적용) */}
				{isCloset && (
					<div className="mt-2.5 flex justify-between w-full">
						<button
							className={ButtonClassName}
						
						>구매하기</button>
						<button
							className={ButtonClassName}
						>AI 분석하기</button>
					</div>)}
			</div>
		</div>
	);
};



export default ProductCard;
