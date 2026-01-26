import type { ProductDataType } from '@/src/pages/closet/closet-page';
import ProductCard from '../common/ProductCard';

interface ItemBrowseSectionProps {
    data : ProductDataType[]
}

const ItemBrowseSection = ({ data } : ItemBrowseSectionProps) => {
	return (
		<>
			{data.length === 0 ? (
				<div className="flex items-center justify-center text-neutral-500 text-medium-15 h-[75vh]">
					상품이 없습니다.
				</div>
			) : 
				<div className='grid grid-cols-2 gap-4 place-items-center'>
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
