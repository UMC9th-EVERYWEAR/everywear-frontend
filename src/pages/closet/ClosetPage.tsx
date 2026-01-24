import CategoryBar from '@/src/components/common/CategoryBar';
import { PATH } from '@/src/router/path';
import { useNavigate } from 'react-router';


const ClosetPage = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center">
			{/* 카테고리 바 */}
			<CategoryBar />
			<div className='flex justify-between w-[375px]'> {/* 나중에 width 설정 바꿔야 함 */}
				<p className='text-regular-14 font-anonymous'>상의 상품(3)</p>
				<button
					className='w-[70.667px] h-6 px-1.75 py-1.25 flex justify-center 
                items-center border rounded-sm border-none bg-primary-600 shrink-0 
                font-inter text-[11.333px] text-white cursor-pointer'
					onClick={() => navigate(PATH.PRODUCTS.URL)}
				>+ 상품추가</button>
			</div>
      
		</div>
	)
}

export default ClosetPage;
