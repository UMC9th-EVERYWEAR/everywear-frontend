
import LinkSection from '@/src/components/products/LinkSection';
import MallLogosSection from '@/src/components/products/MallLogos';
import checkUrlFormat from '@/src/utils/checkUrlFormat';
import { useState } from 'react';


const ProductsAddPage = () => {
	const [link, setLink] = useState('');
	const [loading, setLoading] = useState(false)
	const isValidLink = checkUrlFormat(link);

	return (
		<div className="py-7 px-5 flex flex-col items-center">
			<div className="flex flex-col gap-1 mb-3">
				<p className="text-regular-16 text-neutral-900">
					다음 앱에서 상품 링크를 복사해 붙여넣으세요!
				</p>
				<p className="text-regular-12 text-neutral-600">
					앱을 터치하면 해당 앱으로 이동합니다.
				</p>
			</div>

			{/* mall section */}
			<MallLogosSection />


			{/* link section */}
			<LinkSection
				link={link}
				loading={loading}
				isValidLink={isValidLink}
				onChangeLink={setLink}
				onSubmit={() => setLoading(true)}
			/>


			{/*loading modal*/}
			{/* {
				loading && 
				<div
					className="fixed inset-0 z-100 flex flex-col gap-5 items-center justify-center bg-black/50"
				>				
					<LoadingSpinner size={20} />
					<div className='text-bold-20'>
						상품을 추가하고있어요!
					</div>
				</div>
			} */}
		</div>
	);
};

export default ProductsAddPage;
