import { useState } from 'react';
import LinkSection from '@/src/components/products/LinkSection';
import MallLogosSection from '@/src/components/products/MallLogos';
import checkUrlFormat from '@/src/utils/checkUrlFormat';
import { useImportProductMutation } from '@/src/hooks/queries/useProductMutation'; 
import ProductsModals from '@/src/components/products/ProductsModals';
import usePreventRefresh from '@/src/hooks/domain/products/usePreventRefresh';

const ProductsAddPage = () => {
	const [link, setLink] = useState('');
	const [openModal, setOpenModal] = useState<'SUCCESS' | 'FAIL' | null>(null);


 	const { mutate: importProduct, isPending: importPending } = useImportProductMutation();

	// usePreventRefresh: 상품 가져오는 도중의 새로고침 방지
	const shouldBlockRefresh = importPending;

	usePreventRefresh(shouldBlockRefresh);


	const isValidLink = checkUrlFormat(link);

	const handleSubmit = () => {
		if (!isValidLink || importPending) return;

		importProduct(
			{ product_url: link },
			{
				onSuccess: () => {
					setOpenModal('SUCCESS')
				},
				onError: (error) => {
					console.error('상품 등록 실패', error);
					setOpenModal('FAIL')
				},
			},
		);
	};


	return (
		<div className="py-7 px-5 flex flex-col items-center">
			<div className="flex flex-col gap-1 mb-3">
				<p className="text-regular-16 text-neutral-900 font-pretandard"> 
					다음 앱에서 상품 링크를 복사해 붙여넣으세요!
				</p>
				<p className="text-regular-12 text-neutral-600 font-pretandard">
					앱을 터치하면 해당 앱으로 이동합니다.
				</p>
			</div>

			<MallLogosSection />

			<LinkSection
				link={link}
				loading={importPending} 
				isValidLink={isValidLink}
				onChangeLink={setLink}
				onSubmit={handleSubmit}
			/>

			{
				openModal && <ProductsModals
					type={openModal}
					onClose={()=> setOpenModal(null)}
				             />
			}		
		</div>
	);
};

export default ProductsAddPage;
