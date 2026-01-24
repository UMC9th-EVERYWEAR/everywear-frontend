import CategoryBar from '@/src/components/common/CategoryBar';

const ClosetPage = () => {
	return (
		<div className="flex flex-col items-center">
			{/* 카테고리 바 */}
			<CategoryBar />
			<div className='flex justify-between'>
				<p className='text-regular-14'></p>
			</div>
      
		</div>
	)
}

export default ClosetPage;
