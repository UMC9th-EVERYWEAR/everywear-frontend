import ItemAddCountSection from '@/src/components/closet/ItemAddSection';
import CategoryBar from '@/src/components/common/CategoryBar'
import { PATH } from '@/src/constants/path';
import { useRef, useState } from 'react';
import {  useNavigate } from 'react-router';
import ItemBrowseSection from '@/src/components/closet/ItemBrowseSection';
import MallGuide from '@/src/components/products/MallGuide';
import type { CategoryKey } from '@/src/types/products/product';
import { useProductsByCategory } from '@/src/hooks/service/product/useProducts';
import ItemSkeleton from '@/src/components/closet/ItemSkeleton';


const ProductsPage = () => {
	const navigate = useNavigate();
	const scrollRef = useRef<HTMLDivElement>(null);

	const [selected, setSelected] = useState<CategoryKey>('전체');
	const [showGuide, setShowGuide]  = useState(false)


	const handleSelected = (category : CategoryKey) => setSelected(category)

	const { data: filteredProducts = [] , isLoading: productLodaing } = useProductsByCategory(selected);



	return(
		<div 
			ref={scrollRef}

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
			<div className='sm:w-full'>
				<CategoryBar
					selected={selected}
					onSelect={handleSelected}
				/>		
			</div>

			<div className='w-full flex-col mb-5'> {/* 나중에 width 설정 바꿔야 함 */}

				<ItemAddCountSection
					category={selected}
					count={filteredProducts.length}
					onClick={() => navigate(PATH.PRODUCTS.ADD)}
				/>
				{
					productLodaing ? (
						<ItemSkeleton />
					) :(
						<ItemBrowseSection
							data={filteredProducts}
						/>
					)
				}
			</div>


			{
				showGuide && <MallGuide onClose={()=> setShowGuide(false)} />
			}
		</div>
	)
}
export default ProductsPage
