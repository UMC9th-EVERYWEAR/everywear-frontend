import ItemAddCountSection from '@/src/components/closet/ItemAddSection';
import ItemBrowseSection from '@/src/components/closet/ItemBrowseSection';
import ItemSkeleton from '@/src/components/closet/ItemSkeleton';
import CategoryBar from '@/src/components/common/CategoryBar';
import { PATH } from '@/src/constants/path';
import { useClosetProductsByCategory } from '@/src/hooks/service/product/useClosetProducts';
import type { CategoryKey } from '@/src/types/products/product';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const ClosetPage = () => {
	const navigate = useNavigate();
	const [selected, setSelected] = useState<CategoryKey>('전체');

	const handleSelected = (category : CategoryKey) => setSelected(category)

	const { data: filteredClosetProducts = [],  isLoading: closetLoading } = useClosetProductsByCategory(selected);
	
	return (
		<div className="flex flex-col items-center px-5" >
			<div className='w-full'>
				<CategoryBar
					selected={selected}
					onSelect={handleSelected}
				/>
			</div>

			<div className='w-full flex flex-col mb-5'>

				<ItemAddCountSection
					category={selected}
					count={filteredClosetProducts.length}
					onClick={() => navigate(PATH.PRODUCTS.ADD)}
				/>

				{
					closetLoading ? (
						<ItemSkeleton isCloset/>
					) :(
						<ItemBrowseSection
							closetData={filteredClosetProducts}
							isCloset={true}
						/>
					)
				}

			</div>
      
		</div>
	)
}

export default ClosetPage;
