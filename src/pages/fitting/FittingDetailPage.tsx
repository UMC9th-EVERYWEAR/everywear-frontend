import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import TabBar from '@/src/components/ai-fitting/TabBar';
import FittingItemInfo from '@/src/components/ai-fitting/FittingItemInfo';
import FittingTab from '@/src/components/ai-fitting/FittingTab';
import ReviewTab from '@/src/components/ai-fitting/ReviewTab'; 
import ToastContainer from '@/src/components/common/ToastContainer';
import Toast from '@/src/components/common/Toast';
import useToast from '@/src/hooks/domain/ai-fitting/UseToast';
import { Modal } from '@/src/components/common/Modal';
import { useFittingDetail } from '@/src/hooks/service/fitting/useFittings';

const FittingDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { toasts, createToast, deleteToast } = useToast();
    
	const { data: fittingDetail, isLoading } = useFittingDetail(Number(id));
    
	const [activeTab, setActiveTab] = useState<'fitting' | 'review'>('fitting');
	const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

	if (isLoading) return <div className="flex-1 bg-white" />;
	if (!fittingDetail) return <div className="flex-1 bg-white p-10 text-center">정보를 찾을 수 없습니다.</div>;

	const { product } = fittingDetail;

	// 쇼핑몰 이동 핸들러
	const handleGoToShop = () => {
		if (product?.purchaseUrl) {
			window.open(product.purchaseUrl, '_blank');
		} else {
			createToast({ message: '구매 링크가 없습니다.' });
		}
		setIsBuyModalOpen(false);
	};

	return (
		<div className="flex justify-center min-h-screen bg-[#F8F9FA]">
			<div className="flex flex-col w-full max-w-109 bg-white shadow-lg min-h-screen relative overflow-x-hidden">
                
				<header className="flex items-center px-4 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
					<button
						onClick={() => navigate(-1)}
						className="p-1 cursor-pointer"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M15 18L9 12L15 6"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<h1 className="flex-1 text-center font-bold text-lg pr-8">피팅 내역 상세</h1>
				</header>

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

				<TabBar 
					activeTab={activeTab} 
					onTabChange={(tab) => setActiveTab(tab as 'fitting' | 'review')} 
					isIdle={true}
					onIdleToast={createToast}
				/>

				<div className="flex-1 overflow-y-auto no-scrollbar pb-10">
					<div className="px-4 py-6">
						{/* FittingItemInfo 컴포넌트의 ListDTO 구조에 맞게 매핑 */}
						<FittingItemInfo
							data={{
								shoppingmale_name: product?.siteName || '브랜드 정보 없음',
								product_name: product?.productName || '상품명 정보 없음',
								price: product?.price?.toString() || '0', 
								//product_img_url: product?.productImage || '',
								star_point: product?.rating || 0,
								is_liked: product?.isLiked || false,
							}}
							handleHeart={(isLiked) => {
								createToast({ message: isLiked ? '옷장에서 삭제되었습니다.' : '옷장에 저장되었습니다.' });
							}}
							handleBuy={() => setIsBuyModalOpen(true)}
						/>
					</div>

					<div className="px-4">
						{activeTab === 'fitting' && (
							<FittingTab 
								state={{ 
									status: 'success', 
									resultUrl: fittingDetail.fittingResultImage || '', 
								}} 
								handleStartFitting={() => {}} 
								handleRestartFitting={() => {}}
							/>
						)}

						{activeTab === 'review' && (
							<ReviewTab 
								handleStartReview={() => {}}
								state={{ 
									status: 'success', 
									summary: { 
										status: 'success', 
										text: fittingDetail.reviewSummary || '리뷰 분석 결과입니다.', 
									},
									keywords: [
										{ id: 1, label: `별점 ${product?.rating || 0}` },
										{ id: 2, label: '정사이즈' },
										{ id: 3, label: '가벼움' },
									],
									reviews: fittingDetail.reviews || [], 
								}} 
							/>
						)}
					</div>
				</div>

				<Modal
					isOpen={isBuyModalOpen}
					onClose={() => setIsBuyModalOpen(false)}
					text="쇼핑몰로 이동할까요?"
					btn1Text="이동"
					btn1Action={handleGoToShop}
					btn2Text="취소"
					btn2Action={() => setIsBuyModalOpen(false)}
				/>
			</div>
		</div>
	);
};

export default FittingDetailPage;
