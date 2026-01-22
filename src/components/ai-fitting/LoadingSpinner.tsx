// export const LoadingSpinner = () => {
// 	return (
// 		<div
// 			className="size-12 animate-spin rounded-full border-6 border-[#d9d9d9] border-t-primary-600"
// 			role="status"
// 		>
// 			{/* <span className="sr-only">로딩 중...</span> */}
// 		</div>
// 	);
// };
export const LoadingSpinner = () => {
	return (
		<div role="status">
			<svg
				// size-12 (48px) 등 크기는 여기서 조절하세요
				className="size-15 animate-spin" 
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* 1. 회색 배경 트랙 (완전한 원) */}
				<circle
					className="text-gray-200" // 이미지의 연회색 부분
					strokeWidth="3" // 선 두께
					stroke="currentColor"
					r="10"
					cx="12"
					cy="12"
				/>
                
				{/* 2. 파란색 진행 바 (부분 원) */}
				<circle
					className="text-primary-600" // 이미지의 파란색 부분
					strokeWidth="3" // 선 두께
					strokeLinecap="round" // ★ 핵심: 끝을 둥글게 처리
					stroke="currentColor"
					r="10"
					cx="12"
					cy="12"
					// 원의 둘레(약 62.8) 중 "18만큼 그리고, 45만큼 비워라"는 의미
					// 앞의 숫자를 조절하면 파란 선의 길이가 바뀝니다.
					strokeDasharray="18 45" 
				/>
			</svg>
			<span className="sr-only">로딩 중...</span>
		</div>
	);
};
