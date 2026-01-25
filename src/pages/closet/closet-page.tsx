import ItemAddCountSection from '@/src/components/closet/ItemAddSection';
import ItemBrowseSection from '@/src/components/closet/ItemBrowseSection';
import CategoryBar from '@/src/components/common/CategoryBar';
import type { ProductCardProps } from '@/src/components/common/ProductCard';
import { PATH } from '@/src/constants/path';
import { useState } from 'react';
import { useNavigate } from 'react-router';

// 타입은 나중에 백엔드 연동하고 파일 하나로 정리할 예정입니다.
export interface ProductDataType extends ProductCardProps {
  category: '상의' | '하의' | '아우터' | '원피스';
}

const MOCK_PRODUCTS: ProductDataType[] = [];

const ClosetPage = () => {
	const navigate = useNavigate();
	const [selected, setSelected] = useState('전체');

	const handleSelected = (category : string) => setSelected(category)
    
	// '전체'이면 모든 데이터, 아니면 카테고리가 일치하는 데이터만 반환
	const filteredProducts = selected === '전체' 
		? MOCK_PRODUCTS 
		: MOCK_PRODUCTS.filter((product) => product.category === selected);

	return (
		<div className="flex flex-col items-center">
			<CategoryBar
				selected={selected}
				onSelect={handleSelected}
			/>

			<div className='w-[375px] flex flex-col mb-5'> {/* 나중에 width 설정 바꿔야 함 */}

				<ItemAddCountSection
					category={selected}
					count={filteredProducts.length}
					onClick={() => navigate(PATH.PRODUCTS.URL)}
				/>

				<ItemBrowseSection data={filteredProducts} />

			</div>
      
		</div>
	)
}

export default ClosetPage;
