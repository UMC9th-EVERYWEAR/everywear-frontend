import { Icons } from '@/src/assets/icons/components/Icons';
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

const ButtonClassName = `flex justify-center w-16 p-1 tracking-[-2px] leading-4.5
                          items-center border rounded-lg border-none bg-[var(--color-primary-600)] shrink-0
                          text-medium-12 text-[var(--color-neutral-50)] cursor-pointer font-anonymous
                          hover:bg-[var(--color-primary-700)] transition-colors sm:w-21`
                          
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

	const handleCardClick = () => {
		if (id) {
			navigate(`/ai-fitting/${id}`);
		} else {
			console.warn('상품 ID가 없어 상세 페이지로 이동할 수 없습니다.');
		}
	};

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
      
			<div className="w-full h-[178px] rounded-[10px] overflow-hidden bg-neutral-100 dark:bg-neutral-700">
				<img
					src={imageUrl || '/images/default-product.png'} 
					alt={name}
					className="w-full h-full object-cover transition-transform duration-200 ease-in-out hover:scale-110"
				/>
			</div>

			<div
				className="w-full p-2.5 -mt-[34px] z-10 flex flex-col bg-white dark:bg-neutral-800 rounded-b-xl shadow-[var(--shadow-4)] transition-colors duration-300"
			>
				<div className="flex justify-between items-center text-regular-10">
					<span className="text-neutral-500 dark:text-neutral-400 font-pretandard truncate max-w-[70px]">
						{company || '브랜드'}
					</span>
					<div className="flex items-center">
						<div className="flex items-center justify-center">
							<Icons.Star className='w-2.5 h-2.5 text-neutral-700 dark:text-neutral-200' />
						</div>
						<span className="text-neutral-900 dark:text-neutral-200 ml-0.5">
							{rating}
						</span>
					</div>
				</div>

				<h3 className="w-full text-start overflow-hidden text-neutral-900 dark:text-white text-regular-14 leading-[21px] whitespace-nowrap text-ellipsis mt-0.5">
					{name || '상품명 없음'}
				</h3>

				<p className="overflow-hidden text-start text-neutral-900 dark:text-white text-medium-12 leading-[18px] whitespace-nowrap">
					{price || '0원'}
				</p>

				{isCloset && (
					<div
						className="mt-2.5 flex justify-between w-full"
						onClick={(e) => e.stopPropagation()}
						role="button"
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
						}}
					>
						<button
							className={ButtonClassName}
							onClick={handlePurchase}
						>구매하기</button>
						<button
							className={ButtonClassName}
							onClick={handleRecentFitting}
						>AI 분석하기</button>
					</div>
				)}
			</div>
		</button>
	);
};

export default ProductCard;
