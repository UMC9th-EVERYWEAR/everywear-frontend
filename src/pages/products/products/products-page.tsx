import ItemAddCountSection from '@/src/components/closet/ItemAddSection';
import CategoryBar from '@/src/components/common/CategoryBar'
import { PATH } from '@/src/constants/path';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ItemBrowseSection from '@/src/components/closet/ItemBrowseSection';
import type { ProductDataType } from '../../closet/closet-page';
import MallGuide from '@/src/components/products/MallGuide';


export const MOCK_PRODUCTS: ProductDataType[] = [

];


const ProductsPage = () => {
	const navigate = useNavigate();
	const [selected, setSelected] = useState('전체');
	const [showGuide, setShowGuide]  = useState(false)
  
	const handleSelected = (category : string) => setSelected(category)

	const filteredProducts = selected === '전체' 
		? MOCK_PRODUCTS 
		: MOCK_PRODUCTS.filter((product) => product.category === selected);

	return(
		<div className="px-5 py-2.5 flex flex-col items-center">
			<div className="w-full border-neutral-200 flex justify-end max-w-md">

				<button 
					onClick={()=> setShowGuide(true)}
					className="text-center text-primary-300 text-regular-10 cursor-pointer hover:opacity-75"
				>
					가상 피팅 가이드
				</button>    
			</div>
			<CategoryBar
				selected={selected}
				onSelect={handleSelected}
			/>		

			<div className='w-[375px] flex flex-col mb-5'> {/* 나중에 width 설정 바꿔야 함 */}

				<ItemAddCountSection
					category={selected}
					count={filteredProducts.length}
					onClick={() => navigate(PATH.PRODUCTS.ADD)}
				/>
				<ItemBrowseSection data={filteredProducts} />
			</div>


			{
				showGuide && <MallGuide onClose={()=> setShowGuide(false)} />
			}
		</div>
	)
}
export default ProductsPage
