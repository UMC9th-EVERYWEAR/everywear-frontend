import CategoryBar from '@/src/components/common/CategoryBar';
import ProductCard from '@/src/components/common/ProductCard';
import { PATH } from '@/src/constants/path';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface ProductCardProps {
  company: string;
  name: string;
  price: string;
  rating: number;
  imageUrl: string;
  isCloset?: boolean;
}

interface ProductDataType extends ProductCardProps {
  id: number;
  category: '상의' | '하의' | '아우터' | '원피스';
}

const MOCK_PRODUCTS: ProductDataType[] = [
	// [상의]
	{
		id: 1,
		company: '무신사 스탠다드',
		name: '베이직 화이트 셔츠',
		price: '29,000',
		rating: 4.7,
		imageUrl: 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI',
		category: '상의',
		isCloset: true,
	},
	{
		id: 2,
		company: '지오다노',
		name: '옥스포드 셔츠 블루',
		price: '35,000',
		rating: 4.5,
		imageUrl: 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI',
		category: '상의',
		isCloset: true,
	},
	{
		id: 3,
		company: '나이키',
		name: '에센셜 로고 티셔츠',
		price: '45,000',
		rating: 4.8,
		imageUrl: 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI',
		category: '상의',
		isCloset: true,
	},

	// [하의]
	{
		id: 4,
		company: '에잇세컨즈',
		name: '와이드 데님 팬츠',
		price: '49,900',
		rating: 4.6,
		imageUrl: 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI',
		category: '하의',
		isCloset: true,
	},
	{
		id: 5,
		company: '플랙',
		name: '스트레이트 블랙 진',
		price: '89,000',
		rating: 4.5,
		imageUrl: 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI',
		category: '하의',
		isCloset: true,
	},

	// [아우터]
	{
		id: 6,
		company: '노스페이스',
		name: '눕시 숏 패딩',
		price: '250,000',
		rating: 4.9,
		imageUrl: 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI',
		category: '아우터',
		isCloset: true,
	},
	{
		id: 7,
		company: '커버낫',
		name: '울 싱글 코트',
		price: '129,000',
		rating: 4.3,
		imageUrl: 'https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI',
		category: '아우터',
		isCloset: true,
	},

	// [원피스]
];

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
				{/* 상품 종류 및 개수 & 상품 추가 버튼 */}
				<div className='flex justify-between items-center mb-5'>
					<p className='text-regular-14 font-anonymous'>{selected} 상품({filteredProducts.length})</p>
					<button
						className='w-[70.667px] h-6 px-1.75 py-1.25 flex justify-center 
                items-center border rounded-sm border-none bg-primary-600 shrink-0 
                font-inter text-[11.333px] text-white cursor-pointer'
						onClick={() => navigate(PATH.PRODUCTS.URL)}
					>+ 상품추가</button>
				</div>

				{/* 내 상품 본문 */}
				{filteredProducts.length === 0 ? (
					<div className="flex items-center justify-center text-neutral-500 text-medium-15 h-[75vh]">
						상품이 없습니다.
					</div>
				) : 
					<div className='grid grid-cols-2 gap-4 place-items-center'>
						{filteredProducts.map((product) => (
							<ProductCard
								key={product.id} // 리스트 렌더링엔 key가 필수
								company={product.company}
								name={product.name}
								price={product.price}
								rating={product.rating}
								imageUrl={product.imageUrl}
								isCloset={product.isCloset}
							/>
						))}
					</div>}



			</div>
      
		</div>
	)
}

export default ClosetPage;
