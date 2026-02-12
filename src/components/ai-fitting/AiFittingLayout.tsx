import TabBar from '@/src/components/ai-fitting/TabBar';
import FittingItemInfo from '@/src/components/ai-fitting/FittingItemInfo';
import FittingTab from '@/src/components/ai-fitting/FittingTab';
import ReviewTab from '@/src/components/ai-fitting/ReviewTab';
import Toast from '@/src/components/common/Toast';
import ToastContainer from '@/src/components/common/ToastContainer';
import { Modal } from '@/src/components/common/Modal';
import type { FittingState, ReviewState } from '@/src/types/ai-fitting/status';
import type { ListDTO } from '@/src/apis/generated';
import type { Toast as ToastType } from '@/src/hooks/domain/ai-fitting/useToast';

export type TabType = 'fitting' | 'review';

interface AiFittingLayoutProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isIdle: boolean;
  product: ListDTO | null;
  profileImg?: string;
  fittingState: FittingState;
  reviewState: ReviewState;
  toasts: ToastType[];
  deleteToast: (id: number) => void;
  createToast?: (toast: { message: string }) => void;
  isBuyModalOpen: boolean;
  closeBuyModal: () => void;
  isExitModalOpen?: boolean;
  closeExitModal?: () => void;
  onHeart: (status: boolean) => void;
  onGoToShop: () => void;
  onConfirmBuy: () => void;
  onStartFitting: () => void;
  onRestartFitting?: () => void;
  onStartReview: () => void;
  onExitAction?: () => void;
  showRestartButton?: boolean;
  showBefore?: boolean;
  canRetry: boolean; 
  isFittingHistory: boolean;
}

export const AiFittingLayout = ({
	activeTab, setActiveTab, isIdle, product, profileImg = '',
	fittingState, reviewState, toasts, deleteToast, createToast,
	isBuyModalOpen, closeBuyModal, isExitModalOpen, closeExitModal,
	onHeart, onGoToShop, onConfirmBuy, onStartFitting, onRestartFitting, onStartReview, onExitAction,
	showRestartButton = true,
	showBefore = true,
	canRetry, isFittingHistory,
}: AiFittingLayoutProps) => {
	return (
		<div className="flex items-center justify-center mb-8">
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

				<TabBar
					activeTab={activeTab}
					onTabChange={(tab) => setActiveTab(tab as TabType)}
					isIdle={isIdle}
					onIdleToast={createToast}
				/>

				{product ? (
					<FittingItemInfo
						key={product.product_id}
						data={product}
						handleHeart={onHeart}
						handleBuy={onGoToShop}
						isFittingHistory={isFittingHistory}
					/>
				) : (
					<div className="h-24 flex items-center justify-center text-gray-400 font-medium">
						상품 정보를 찾을 수 없습니다.
					</div>
				)}

				<div className="flex-1 overflow-y-auto no-scrollbar pb-10">
					{activeTab === 'fitting' && (
						<FittingTab
							state={fittingState}
							profileImg={profileImg}
							handleStartFitting={onStartFitting}
							handleRestartFitting={onRestartFitting || onStartFitting}
							showRestart={showRestartButton}
							showBefore={showBefore}
						/>
					)}

					{activeTab === 'review' && (
						<ReviewTab
							state={{
								status: reviewState.status,
								reviews: reviewState.reviews || [],
							}}
							aiState={{
								status: reviewState.summary.status,
								result: {
									summary: reviewState.summary.text,
									keywords: (reviewState.keywords || []).map(k => k.label),
								},
							}}
							handleStartReviewAi={onStartReview}
							// ✅ 3. 자식인 ReviewTab에게 canRetry를 넘겨줍니다. (에러 해결 지점)
							canRetry={canRetry} 
						/>
					)}
				</div>

				<Modal
					isOpen={isBuyModalOpen}
					onClose={closeBuyModal}
					text="쇼핑몰로 이동할까요?"
					btn1Text="이동"
					btn1Action={onConfirmBuy}
					btn2Text="취소"
					btn2Action={closeBuyModal}
				/>

				{isExitModalOpen !== undefined && closeExitModal && onExitAction && (
					<Modal
						isOpen={isExitModalOpen}
						onClose={closeExitModal}
						title="분석을 중단할까요?"
						text="지금 나가시면 분석 결과가 저장되지 않습니다."
						btn1Text="나가기"
						btn1Action={onExitAction}
						btn2Text="취소"
						btn2Action={closeExitModal}
					/>
				)}
			</div>
		</div>
	);
};
