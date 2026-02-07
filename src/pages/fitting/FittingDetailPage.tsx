import { useState } from 'react';
import { useParams } from 'react-router';
import TabBar from '@/src/components/ai-fitting/TabBar';
import FittingItemInfo from '@/src/components/ai-fitting/FittingItemInfo';
import FittingTab from '@/src/components/ai-fitting/FittingTab';
import ReviewTab from '@/src/components/ai-fitting/ReviewTab'; 
import Toast from '@/src/components/common/Toast';
import ToastContainer from '@/src/components/common/ToastContainer';
import useToast from '@/src/hooks/domain/ai-fitting/UseToast';
import { Modal } from '@/src/components/common/Modal';
import { useFittingDetail } from '@/src/hooks/service/fitting/useFittings';

export type TabType = 'fitting' | 'review';

const FittingDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	// 이미 DB에 있는 데이터만 조회
	const { data: fittingDetail, isLoading } = useFittingDetail(Number(id));

	const [activeTab, setActiveTab] = useState<TabType>('fitting');
	const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
	const [isHearted, setIsHearted] = useState(false);

	const { toasts, createToast, deleteToast } = useToast();

	// 조회 페이지이므로 스켈레톤만 잠깐
	if (isLoading) return <div className="flex-1 bg-white" />;

	if (!fittingDetail)
		return (
			<div className="flex-1 bg-white p-10 text-center">
				정보를 찾을 수 없습니다.
			</div>
		);

	const product = fittingDetail.product;

	return (
		<div className='flex items-center justify-center mb-8'>
			<div className="flex flex-col px-4 h-full w-full max-w-109 relative">

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

				{/* 조회 페이지 */}
				<TabBar 
					activeTab={activeTab} 
					onTabChange={(tab) => setActiveTab(tab as TabType)} 
					isIdle={true}
					onIdleToast={createToast}
				/>

				<FittingItemInfo
					data={{
						company: product?.siteName || '무신사',
						title: product?.productName || '상품명',
						price: Number(product?.price) || 0,
						imgUrl: product?.productImage || fittingDetail.afterImageUrl,
						buyUrl: product?.purchaseUrl || '#',
					}}
					isHearted={isHearted}
					handleHeart={() => {
						const next = !isHearted;
						setIsHearted(next);

						if (next) {
							createToast({ message: '내 옷장에 추가되었습니다.' });
						}
					}}
					handleBuy={() => setIsBuyModalOpen(true)}
				/>

				{/* 가상피팅 결과 – 바로 success 상태 */}
				{activeTab === 'fitting' && (
					<FittingTab 
						state={{ 
							status: 'success', 
							resultUrl:
								fittingDetail.afterImageUrl ||
								fittingDetail.resultImageUrl,
						}} 
						// 조회 페이지 → 동작 없음
						handleStartFitting={() => {}}
						handleRestartFitting={() => {}}
					/>
				)}

				{/* 리뷰 결과 – 바로 success 상태 */}
				{activeTab === 'review' && (
					<ReviewTab 
						state={{ 
							status: 'success', 
							summary: {
								status: 'success',
								text:
									fittingDetail.reviewSummary ||
									'AI 리뷰 분석이 완료된 결과입니다.',
							},
							keywords: [
								`만족도 ${product?.rating ?? 0}`,
								'정사이즈',
								'깔끔함',
							],
							reviews: [],
						}} 
						handleStartReview={() => {}}
					/>
				)}

				<Modal
					isOpen={isBuyModalOpen}
					onClose={() => setIsBuyModalOpen(false)}
					text="쇼핑몰로 이동할까요?"
					btn1Text="이동"
					btn1Action={() => {
						if (product?.purchaseUrl) {
							window.open(
								product.purchaseUrl,
								'_blank',
								'noopener,noreferrer',
							);
						}
						setIsBuyModalOpen(false);
					}}
					btn2Text="취소"
					btn2Action={() => setIsBuyModalOpen(false)}
				/>

			</div>
		</div>
	);
};

export default FittingDetailPage;
