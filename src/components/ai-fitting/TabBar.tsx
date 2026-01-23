import clsx from 'clsx';

interface TabBarProps {
    handleTabBarFitting : () => void;
    handleTabBarReview : () => void;
    isAiFitting : number;      // true면 'AI 피팅', false면 'AI 리뷰'
}

const TabBar = ({ handleTabBarFitting, handleTabBarReview, isAiFitting } : TabBarProps) => {
	return (
		<div className="relative flex border-b border-neutral-200 mb-[5px]"> 
            
			{/* 1. AI 피팅 버튼 */}
			<button
				className={clsx(
					'text-base flex-1 h-11 flex items-center justify-center p-2.5 transition-all duration-300 cursor-pointer', 
					!isAiFitting ? 'text-primary-600' : 'text-neutral-400',
				)}
				onClick={handleTabBarFitting}
			>AI 피팅</button>

			{/* 2. AI 리뷰 버튼 */}
			<button
				className={clsx(
					'text-base flex-1 h-11 flex items-center justify-center p-2.5 transition-all duration-300 cursor-pointer', 
					isAiFitting ? 'text-primary-600' : 'text-neutral-400',
				)}
				onClick={handleTabBarReview}
			>AI 리뷰</button>

			{/* 3. 버튼 밑 밑줄 이동(슬라이딩 인디케이터) */}
			<div
				className={clsx(
					'absolute bottom-0 left-0 h-0.25 w-1/2 bg-primary-600', 
					'transition-transform duration-200 ease-in-out', 
					isAiFitting ? 'translate-x-full' : 'translate-x-0', 
				)}
			/>
		</div>
	)
}

export default TabBar;
