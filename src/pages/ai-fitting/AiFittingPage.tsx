import { useState } from 'react';

const AiFittingPage = () => {
	const [isAiFitting, setIsAiFitting] = useState(0);
	const tabBarCss = ['text-primary-600 border-b border-b-1.5 border-b-primary-600', 'text-neutral-400 border-b border-b-0.5 border-b-neutral-400'];
	const handleTabBar = () => {
		setIsAiFitting((prev) => prev ? 0 : 1)
	}
	return (
		<div className="flex flex-col">
			<div className="flex max-w-2xs transition-all duration-300 h-5">
				<button
					className={}
					onClick={handleTabBar}
				>AI 피팅</button>
				<button
					className={`${tabBarCss[1 - isAiFitting]} text-base`}
					onClick={handleTabBar}
				>AI 리뷰</button>
			</div>
		</div>
	)
}

export default AiFittingPage;
