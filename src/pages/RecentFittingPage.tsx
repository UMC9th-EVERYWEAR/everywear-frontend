import { formatToMonthGroup } from '@/src/utils/date';
import { useMemo } from 'react';
import { useFittings } from '@/src/hooks/service/fitting/useFittings';
import ItemSkeleton from '@/src/components/closet/ItemSkeleton';

const RecentFitting = () => {
	// 1. 우리가 만든 훅에서 데이터를 가져옵니다.
	const { data: fittingHistory = [], isLoading } = useFittings();

	// 2. 고유한 '월' 리스트 추출 (데이터가 바뀔 때마다 최적화)
	const months = useMemo(() => {
		if (!fittingHistory.length) return [];
        
		const uniqueMonths = Array.from(
			new Set(fittingHistory.map((item) => formatToMonthGroup(item.createdAt || '2025.1.1'))),
		);
		// 내림차순 정렬
		return uniqueMonths.sort((a, b) => b.localeCompare(a));
	}, [fittingHistory]);

	// 3. 로딩 처리 (팀원들이 만든 스켈레톤 활용)
	if (isLoading) {
		return (
			<div className='p-4'>
				<ItemSkeleton />
			</div>
		);
	}

	// 4. 빈 화면 처리
	if (fittingHistory.length === 0) {
		return (
			<div className='flex flex-1 flex-col items-center justify-center h-full bg-white'>
				<p className='text-[var(--color-neutral-500)] text-medium-16'>피팅 내역이 없습니다</p>
			</div>
		);
	}

	return (
		<main className='flex-1 overflow-y-auto bg-white pb-20 no-scrollbar'>
			{months.map((month) => (
				<section
					key={month}
					className='mt-8'
				>
					<h2 className='px-4 mb-4 text-[var(--color-neutral-900)] text-medium-16 font-bold leading-normal'>
						{month}
					</h2>
                    
					{/* 가로 스크롤 영역 */}
					<div className='flex gap-[10px] overflow-x-auto no-scrollbar pl-4 pr-4'>
						{fittingHistory
							.filter(item => formatToMonthGroup(item.createdAt) === month)
							.map((item) => (
								<div 
									key={item.id} 
									// ✅ Lint 해결: 웹 접근성 속성 추가
									role="button"
									tabIndex={0}
									className='min-w-[calc((100%-32px-20px)/2.5)] aspect-[3/4] rounded-[10px] overflow-hidden bg-[var(--color-neutral-100)] shrink-0 relative cursor-pointer active:scale-95 transition-transform outline-none focus:ring-2 focus:ring-primary-300'
									onClick={() => {
										console.log(`${item.id}번 피팅 상세로 이동`);
									}}
									// ✅ Lint 해결: 키보드 이벤트 추가
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											console.log(`${item.id}번 피팅 상세로 이동`);
										}
									}}
								>
									<img 
										src={item.resultImageUrl} 
										alt='피팅 이미지' 
										className='w-full h-full object-cover' 
									/>
									{/* 날짜 표시 */}
									<div className='absolute bottom-2 w-full text-center'>
										<span className='text-[var(--color-neutral-50)] text-regular-14 font-medium drop-shadow-md'>
											{new Date(item.createdAt).toLocaleDateString().replace(/\s/g, '').slice(0, -1)}
										</span>
									</div>
								</div>
							))}
					</div>
				</section>
			))}
		</main>
	);
};

export default RecentFitting;
