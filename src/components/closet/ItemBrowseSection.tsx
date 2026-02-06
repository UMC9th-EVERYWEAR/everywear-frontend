import ProductCard from '../common/ProductCard';
import { useState } from 'react';
import ProductCardSkeleton from '../common/ProductCardSkeleton';
import { IconImage } from '@/src/assets/icons/image/IconImage';
import type { ListDTO } from '@/src/apis/generated';

interface ItemBrowseSectionProps {
    data : ListDTO[]
}

const ItemBrowseSection = ({ data } : ItemBrowseSectionProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLoading, _setIsLoading] = useState(false)
	  const MIN_PRODUCTS = 8; // 로딩시 보여줄 임시 상품 개수

	if (isLoading) {
		return (
			<div className="grid grid-cols-2 gap-2 place-items-center tablet:grid-cols-3">
				{Array.from({ length: MIN_PRODUCTS }).map((_, index) => (
					<ProductCardSkeleton
						key={index}
					/>
				))}
			</div>
		);
	}
	
	return (
		<>
			{data.length === 0 ? (
				<div className="flex flex-col items-center justify-center text-neutral-500 text-medium-15 h-[75vh]">

					<IconImage
						name="Product"
						size={200}
					/>
					<span className='text-medium-20 mb-3'>아직 피팅할 상품이 없어요</span>
					<p className='text-medium-14'>
						관심 있는 상품을 추가하고
					</p>
					<p className='text-medium-14'>
						AI 피팅으로 스타일을 미리 확인해 보세요.					
					</p>
				</div>
			) : 
				<div className='grid grid-cols-2 gap-2.5 place-items-center sm:grid-cols-3'>
					{data.map((product) => (
						<ProductCard
							key={product.product_id} // 리스트 렌더링엔 key가 필수
							id={product.product_id ?? 0}
							company={product.brand_name ?? ''}
							name={product.product_name ?? ''}
							price={product.price ?? ''}
							rating={product.star_point ?? 0}
							imageUrl={product.product_img_url ?? ''}
							// isCloset={product.isCloset}
						/>
					))}
				</div>}
		</>
	)
}

export default ItemBrowseSection
