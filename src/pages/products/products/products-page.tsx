import ItemAddCountSection from '@/src/components/closet/ItemAddSection';
import CategoryBar from '@/src/components/common/CategoryBar'
import { PATH } from '@/src/constants/path';
import {  useState } from 'react';
import {  useNavigate } from 'react-router';
import ItemBrowseSection from '@/src/components/closet/ItemBrowseSection';
import MallGuide from '@/src/components/products/MallGuide';
import type { CategoryKey } from '@/src/types/products/product';
import { useProductsByCategory } from '@/src/hooks/service/product/useProducts';
import ItemSkeleton from '@/src/components/closet/ItemSkeleton';
import ErrorPage from '../../error/error-page';


const ProductsPage = () => {
	const navigate = useNavigate();

	const [selected, setSelected] = useState<CategoryKey>('전체');
	const [showGuide, setShowGuide]  = useState(false)
	const { data: products = [] , isLoading: productLoading, isError : productError, error } = useProductsByCategory(selected);


	const handleSelected = setSelected;
	const handleAddProduct = () => {
		navigate(PATH.PRODUCTS.ADD)
	}




	if (productError && error) return <ErrorPage error={error} />;


	return(
		<div 

			className="px-5 py-2.5 flex flex-col items-center"
		>
			<div className="w-full border-neutral-200 flex justify-end">

				<button 
					onClick={()=> setShowGuide(true)}
					className="text-end text-primary-300 text-regular-10 cursor-pointer hover:opacity-75 sm:w-full"
				>
					가상 피팅 가이드
				</button>    
			</div>
			<div className='w-full'>
				<CategoryBar
					selected={selected}
					onSelect={handleSelected}
				/>		
			</div>

			<div className='w-full flex-col mb-5'>

				<ItemAddCountSection
					category={selected}
					count={products.length}
					onClick={handleAddProduct}
				/>
				{
					productLoading ? (
						<ItemSkeleton />
					) :(
						<ItemBrowseSection
							productdata={products}
						/>
					)
				}

				{showGuide && (
					<MallGuide onClose={() => setShowGuide(false)} />
				)}

			</div>
		</div>
	)
}
export default ProductsPage
