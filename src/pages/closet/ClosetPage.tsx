import CategoryBar from '@/src/components/common/CategoryBar';
import ProductCard from '@/src/components/common/ProductCard';
import { PATH } from '@/src/router/path';
import { useNavigate } from 'react-router';


const ClosetPage = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center">
			<CategoryBar />
			<div className='w-[375px] flex flex-col mb-5'> {/* 나중에 width 설정 바꿔야 함 */}
				{/* 상품 종류 및 개수 & 상품 추가 버튼 */}
				<div className='flex justify-between items-center'>
					<p className='text-regular-14 font-anonymous'>상의 상품(3)</p>
					<button
						className='w-[70.667px] h-6 px-1.75 py-1.25 flex justify-center 
                items-center border rounded-sm border-none bg-primary-600 shrink-0 
                font-inter text-[11.333px] text-white cursor-pointer'
						onClick={() => navigate(PATH.PRODUCTS.URL)}
					>+ 상품추가</button>
				</div>

				{/* 내 상품 본문 */}
				<div className=''>
					<ProductCard
						company='무신사'
						name='베이직 화이트 셔츠'
						price='29000'
						rating={4.7}
						imageUrl='https://lh3.googleusercontent.com/d/1XuItc3eisxkLo6ZXqClQs-ZcsbYU0brI'
					/>
				</div>



			</div>
      
		</div>
	)
}

export default ClosetPage;
