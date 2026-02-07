// import { useState } from 'react';
// import { useNavigate, useParams } from 'react-router';
// import TabBar from '@/src/components/ai-fitting/TabBar';
// import FittingItemInfo from '@/src/components/ai-fitting/FittingItemInfo';
// import FittingTab from '@/src/components/ai-fitting/FittingTab';
// import ReviewTab from '@/src/components/ai-fitting/ReviewTab'; 
// import Toast from '@/src/components/common/Toast';
// import ToastContainer from '@/src/components/common/ToastContainer';
// import useToast from '@/src/hooks/domain/ai-fitting/UseToast';
// import { Modal } from '@/src/components/common/Modal';
// import { useFittingDetail } from '@/src/hooks/service/fitting/useFittings';

// const FittingDetailPage = () => {
// 	const { id } = useParams<{ id: string }>();
// 	const navigate = useNavigate();
// 	const { toasts, createToast, deleteToast } = useToast();
    
// 	// 1. 상세 데이터 가져오기 (useFittings에서 만든 훅 사용)
// 	const { data: fittingDetail, isLoading } = useFittingDetail(Number(id));
    
// 	const [activeTab, setActiveTab] = useState<'fitting' | 'review'>('fitting');
// 	const [isHearted, setIsHearted] = useState(false);
// 	const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

// 	// 💡 조회 페이지이므로 분석 로직(isAnalyzing)은 제거합니다.
// 	if (isLoading) return <div className="flex-1 bg-white" />;
    
// 	if (!fittingDetail) {
// 		return (
// 			<div className="flex flex-1 flex-col items-center justify-center bg-white h-screen">
// 				<p className="text-[var(--color-neutral-500)]">정보를 불러올 수 없습니다.</p>
// 				<button
// 					onClick={() => navigate(-1)}
// 					className="mt-4 text-primary-500 underline"
// 				>뒤로가기</button>
// 			</div>
// 		);
// 	}

// 	const handleHeart = () => {
// 		setIsHearted(!isHearted);
// 		if (!isHearted) createToast({ message: '내 옷장에 추가되었습니다.' });
// 	};

// 	return (
// 		<div className="flex flex-col px-4 h-full w-full max-w-109 relative bg-white min-h-screen">
// 			<ToastContainer>
// 				{toasts.map((t) => (
// 					<Toast
// 						key={t.id}
// 						id={t.id}
// 						message={t.message}
// 						deleteToast={deleteToast}
// 					/>
// 				))}
// 			</ToastContainer>

// 			{/* 상단 탭 (항상 idle 상태로 설정) */}
// 			<TabBar 
// 				activeTab={activeTab} 
// 				onTabChange={(tab) => setActiveTab(tab as 'fitting' | 'review')} 
// 				isIdle={true} 
// 				onIdleToast={createToast}
// 			/>

// 			{/* 상품 정보 (fittingDetail 데이터 바인딩) */}
// 			<FittingItemInfo
// 				data={{
// 					company: fittingDetail.usedItems?.[0]?.category || 'Brand',
// 					title: fittingDetail.usedItems?.[0]?.name || '피팅 상품',
// 					price: 0,
// 					imgUrl: fittingDetail.resultImageUrl,
// 					buyUrl: '#',
// 				}}
// 				isHearted={isHearted}
// 				handleHeart={handleHeart}
// 				handleBuy={() => setIsBuyModalOpen(true)}
// 			/>

// 			{/* 피팅 결과 탭 */}
// 			{activeTab === 'fitting' && (
// 				<FittingTab 
// 					state={{ status: 'success', resultUrl: fittingDetail.resultImageUrl }} 
// 					handleStartFitting={() => {}} 
// 					handleRestartFitting={() => {}}
// 				/>
// 			)}

// 			{/* 리뷰 분석 탭 */}
// 			{activeTab === 'review' && (
// 				<ReviewTab 
// 					state={{ 
// 						status: 'success', 
// 						summary: { status: 'success', text: '이미 분석이 완료된 리뷰 요약입니다.' },
// 						keywords: ['정사이즈', '깔끔함', '신축성 좋음'],
// 						reviews: [], 
// 					}} 
// 					handleStartReview={() => {}}
// 				/>
// 			)}

// 			{/* 구매 모달 */}
// 			<Modal
// 				isOpen={isBuyModalOpen}
// 				onClose={() => setIsBuyModalOpen(false)}
// 				text="쇼핑몰로 이동할까요?"
// 				btn1Text="이동"
// 				btn1Action={() => {
// 					window.open('#', '_blank');
// 					setIsBuyModalOpen(false);
// 				}}
// 				btn2Text="취소"
// 				btn2Action={() => setIsBuyModalOpen(false)}
// 			/>
// 		</div>
// 	);
// };

// export default FittingDetailPage;
