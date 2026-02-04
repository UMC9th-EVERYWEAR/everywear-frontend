import { useState } from 'react';
import { useNavigate } from 'react-router'; 
import LinkSection from '@/src/components/products/LinkSection';
import MallLogosSection from '@/src/components/products/MallLogos';
import checkUrlFormat from '@/src/utils/checkUrlFormat';
import { useImportProductMutation } from '@/src/hooks/queries/useProductMutation'; 
import { PATH } from '@/src/constants/path'; 

const ProductsAddPage = () => {
  const [link, setLink] = useState('');
  const navigate = useNavigate(); 
  
  // API 호출 로직을 전용 mutation 훅으로 분리
  const { mutate: importProduct, isPending } = useImportProductMutation();

  const isValidLink = checkUrlFormat(link);

  const handleSubmit = () => {
    if (!isValidLink || isPending) return;

    // 컴포넌트 내부에서 직접 await 하지 않고 mutation 훅 실행
    importProduct(
      { product_url: link },
      {
        onSuccess: () => {
          alert('상품이 옷장에 성공적으로 담겼습니다!');
          navigate(PATH.HOME); 
        },
        onError: (error) => {
          console.error('상품 등록 실패', error);
          alert('상품 등록에 실패했습니다. 링크를 다시 확인해주세요.');
        }
      }
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
        loading={isPending} 
        isValidLink={isValidLink}
        onChangeLink={setLink}
        onSubmit={handleSubmit}
      />

      {/* 로딩 모달 */}
      {isPending && (
        <div className="fixed inset-0 z-[100] flex flex-col gap-5 items-center justify-center bg-black/50">
          <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ProductsAddPage;