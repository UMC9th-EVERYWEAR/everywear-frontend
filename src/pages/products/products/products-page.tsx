import ItemAddCountSection from '@/src/components/closet/ItemAddSection';
import CategoryBar from '@/src/components/common/CategoryBar'
import { PATH } from '@/src/constants/path';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import ItemBrowseSection from '@/src/components/closet/ItemBrowseSection';
import MallGuide from '@/src/components/products/MallGuide';
import type { CategoryKey } from '@/src/types/products/product';
import { useProducts, useTopProducts, useOuterProducts, useEtcProducts, useDressProducts, useBottomProducts } from '@/src/hooks/service/product/useProducts';
import type { ListDTO } from '@/src/apis/generated';


const ProductsPage = () => {
	const navigate = useNavigate();
	const scrollRef = useRef<HTMLDivElement>(null);

	const [selected, setSelected] = useState<CategoryKey>('전체');
	const [showGuide, setShowGuide]  = useState(false)


	const handleSelected = (category : CategoryKey) => setSelected(category)

	const all = useProducts();
	const top = useTopProducts();
	const outer = useOuterProducts();
	const etc = useEtcProducts();
	const dress = useDressProducts();
	const bottom = useBottomProducts();

	const dataMap: Record<CategoryKey, ListDTO[]> = {
		전체: all.data ?? [],
		상의: top.data ?? [],
		아우터: outer.data ?? [],
		기타: etc.data ?? [],
		원피스: dress.data ?? [],
		하의: bottom.data ?? [],
	};

	const filteredProducts = dataMap[selected];

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
				<ItemBrowseSection data={filteredProducts} />
			</div>


			{
				showGuide && <MallGuide onClose={()=> setShowGuide(false)} />
			}
		</div>
	)
}
export default ProductsPage
