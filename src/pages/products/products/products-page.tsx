import ItemAddCountSection from '@/src/components/closet/ItemAddSection';
import CategoryBar from '@/src/components/common/CategoryBar'
import { PATH } from '@/src/constants/path';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ItemBrowseSection from '@/src/components/closet/ItemBrowseSection';
import type { ProductDataType } from '../../closet/closet-page';
import clo from '@/public/svgs/dummyphoto.jpeg'
import MallGuide from '@/src/components/products/MallGuide';


export const MOCK_PRODUCTS: ProductDataType[] = [
	{
		id: 1,
		company: 'UNIQLO',
		name: 'U 크루넥 반팔 티셔츠',
		price: 19900,
		rating: 4.5,
		imageUrl: clo,
		category: '상의',
	},
	{
		id: 2,
		company: 'Musinsa Standard',
		name: '베이직 오버핏 셔츠',
		price: 39900,
		rating: 4.3,
		imageUrl: clo,
		category: '상의',
	},
	{
		id: 3,
		company: 'ZARA',
		name: '와이드 데님 팬츠',
		price: 89000,
		rating: 4.2,
		imageUrl: clo,
		category: '하의',
	},
	{
		id: 4,
		company: '8Seconds',
		name: '테일러드 자켓',
		price: 129000,
		rating: 4.4,
		imageUrl: clo,
		category: '아우터',
	},
	{
		id: 5,
		company: 'H&M',
		name: '니트 미디 원피스',
		price: 59000,
		rating: 4.1,
		imageUrl: clo,
		category: '원피스',
	},
	{
		id: 6,
		company: 'MUSINSA',
		name: '롱 패딩 코트',
		price: 189000,
		rating: 4.6,
		imageUrl: clo,
		category: '아우터',
	},
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
			<div className="w-full border-b border-neutral-200 flex justify-end max-w-md">

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
