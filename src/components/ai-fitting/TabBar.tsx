import type { ToastInput } from '@/src/hooks/domain/ai-fitting/UseToast';
import type { TabType } from '@/src/pages/ai-fitting/ai-fitting-page';
import { cn } from '@/src/utils/cn';

interface TabBarProps {
	onTabChange : (tab : TabType) => void;
	onIdleToast : (toast : ToastInput) => void;
    activeTab : 'fitting' | 'review';   
	isIdle : boolean;
}

const TabBar = ({ onTabChange, onIdleToast, activeTab, isIdle } : TabBarProps) => {
	return (
		<div className="relative flex border-b border-neutral-200 mb-[5px]"> 
            
			{/* 1. AI 피팅 버튼 */}
			<button
				className={cn(
					'text-bold-16 flex-1 h-11 flex items-center justify-center p-2.5 transition-all duration-300 cursor-pointer', 
					activeTab === 'fitting' ? 'text-primary-600' : 'text-neutral-400',
				)}
				onClick={() => onTabChange('fitting')}
			>AI 피팅</button>

			{/* 2. AI 리뷰 버튼 */}
			<button
				className={cn(
					'text-bold-16 flex-1 h-11 flex items-center justify-center p-2.5 transition-all duration-300 cursor-pointer', 
					activeTab === 'review' ? 'text-primary-600' : 'text-neutral-400',
				)}
				onClick={!isIdle ? () => onTabChange('review') : () => onIdleToast({ message : '먼저 가상피팅을 실행해주세요!' })}
			>AI 리뷰</button>

			{/* 3. 버튼 밑 밑줄 이동(슬라이딩 인디케이터) */}
			<div
				className={cn(
					'absolute bottom-0 left-0 h-[1.5px] w-1/2 bg-primary-600', 
					'transition-transform duration-200 ease-in-out', 
					activeTab === 'review' ? 'translate-x-full' : 'translate-x-0', 
				)}
			/>
		</div>
	)
}

export default TabBar;
