import ProductCardSkeleton from '../common/ProductCardSkeleton'

interface ItemSkeletonProps {
  isCloset?: boolean
}
const ItemSkeleton = ({ isCloset = false }: ItemSkeletonProps) => {
  	  const MIN_PRODUCTS = 8; // 로딩시 보여줄 임시 상품 개수

	return(
		<div className="grid grid-cols-2 gap-2 place-items-center sm:grid-cols-3">
			{Array.from({ length: MIN_PRODUCTS }).map((_, index) => (
				<ProductCardSkeleton
					key={index}
					isCloset={isCloset}
				/>
			))}
		</div>)
}
export default ItemSkeleton
