import { useState } from 'react';
import LinkSection from '@/src/components/products/LinkSection';
import MallLogosSection from '@/src/components/products/MallLogos';
import  {  checkDomainDomainFormat, checkUrlFormat } from '@/src/utils/checkUrlFormat';
import { useImportProductMutation } from '@/src/hooks/queries/useProductMutation'; 
import ProductsModals from '@/src/components/products/ProductsModals';
import usePreventRefresh from '@/src/hooks/domain/products/usePreventRefresh';
import useToast from '@/src/hooks/domain/ai-fitting/UseToast';
import Toast from '@/src/components/common/Toast';
import ToastContainer from '@/src/components/common/ToastContainer';

const ProductsAddPage = () => {
	const [link, setLink] = useState('');
	const [openModal, setOpenModal] = useState<'SUCCESS' | 'FAIL' | null>(null);
	const { toasts , deleteToast, createToast }  = useToast()

	// API 호출 로직을 전용 mutation 훅으로 분리
	const { mutate: importProduct, isPending } = useImportProductMutation();

	// usePreventRefresh: 상품 가져오는 도중의 새로고침 방지
	const shouldBlockRefresh = isPending

	usePreventRefresh(shouldBlockRefresh);


	const isValidLink = checkUrlFormat(link);
	const isValidDomain = checkDomainDomainFormat(link)

	const handleSubmit = () => {
		if (!isValidLink || isPending) return;
		if(!isValidDomain){
			createToast({ message: '지원되지 않는 쇼핑몰입니다.' });
			return;
		}

		// 컴포넌트 내부에서 직접 await 하지 않고 mutation 훅 실행
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
			<ToastContainer>
				{toasts.map((t) => (
					<Toast
						key={t.id}
						id={t.id}
						message={t.message}
						deleteToast={deleteToast}
					/>
				))}
			</ToastContainer>


			<MallLogosSection />

			<LinkSection
				link={link}
				loading={isPending} 
				isValidLink={isValidLink}
				onChangeLink={setLink}
				onSubmit={handleSubmit}
			/>


			{/** modals */}
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
