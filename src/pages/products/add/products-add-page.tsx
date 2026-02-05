import { useState } from 'react';
import { useNavigate } from 'react-router'; 
import { useQueryClient } from '@tanstack/react-query'; 
import LinkSection from '@/src/components/products/LinkSection';
import MallLogosSection from '@/src/components/products/MallLogos';
import checkUrlFormat from '@/src/utils/checkUrlFormat';
import { importProduct } from '@/src/apis/domain/product';

const ProductsAddPage = () => {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); 
  const queryClient = useQueryClient(); 

  const isValidLink = checkUrlFormat(link);

  const handleSubmit = async () => {
    if (!isValidLink || loading) return;

    try {
      setLoading(true);

      // 상품 등록 API 호출
      await importProduct({
        product_url: link,
      });

      await queryClient.invalidateQueries({ queryKey: ['home', 'products'] });
      await queryClient.invalidateQueries({ queryKey: ['products', 'list'] });

      alert('상품이 옷장에 성공적으로 담겼습니다!');
      
      // 작업이 끝나면 홈 화면으로 이동
      navigate('/home'); 

    } catch (error) {
      console.error('상품 등록 실패', error);
      alert('상품 등록에 실패했습니다. 링크를 다시 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

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

      {/* 쇼핑몰 로고 섹션 */}
      <MallLogosSection />

      {/* 링크 입력 섹션 */}
      <LinkSection
        link={link}
        loading={loading}
        isValidLink={isValidLink}
        onChangeLink={setLink}
        onSubmit={handleSubmit}
      />

      {/* 로딩 모달 (필요시 주석 해제) */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col gap-5 items-center justify-center bg-black/50">
          <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin" />
          <div className="text-white text-bold-20">
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsAddPage;