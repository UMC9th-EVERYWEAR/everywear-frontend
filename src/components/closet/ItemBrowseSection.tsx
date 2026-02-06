import type { ProductDataType } from '@/src/pages/closet/closet-page';
import ProductCard from '../common/ProductCard';
import { useState } from 'react';
import ProductCardSkeleton from '../common/ProductCardSkeleton';
import { IconImage } from '@/src/assets/icons/image/IconImage';

interface ItemBrowseSectionProps {
    data : ProductDataType[]
}

const ItemBrowseSection = ({ data } : ItemBrowseSectionProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLoading, _setIsLoading] = useState(false)
	  const MIN_PRODUCTS = 8; // 로딩시 보여줄 임시 상품 개수

	if (isLoading) {
		return (
			<div className="mx-5 grid grid-cols-2 gap-2 place-items-center">
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
				<div className='mx-5 grid grid-cols-2 gap-2.5 place-items-center'>
					{data.map((product) => (
						<ProductCard
							key={product.id} // 리스트 렌더링엔 key가 필수
							id={product.id}
							company={product.company}
							name={product.name}
							price={product.price}
							rating={product.rating}
							imageUrl={product.imageUrl}
							isCloset={product.isCloset}
						/>
					))}
				</div>}
		</>
	)
}

export default ItemBrowseSection
