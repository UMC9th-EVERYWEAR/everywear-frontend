import { useMemo } from 'react';
import { useNavigate } from 'react-router'; 
import { formatToMonthGroup } from '@/src/utils/date';
import { useFittings } from '@/src/hooks/service/fitting/useFittings';
import { PATH } from '@/src/constants/path';

interface FittingItem {
    id: number;
    fittingId?: number; 
    createdAt: string;
    fittingResultImage: string; 
    status: 'COMPLETED' | 'PROCESSING' | 'FAILED';
}

const RecentFitting = () => {
	const navigate = useNavigate();
	const { data = [], isLoading } = useFittings() as unknown as { 
        data: FittingItem[]; 
        isLoading: boolean 
    };

	// 월별 그룹화 
	const months = useMemo(() => {
		if (!data.length) return [];
		const uniqueMonths = Array.from(
			new Set(data.map((item) => formatToMonthGroup(item.createdAt))),
		);
		// 최신 달이 위로 오도록 정렬
		return uniqueMonths.sort((a, b) => b.localeCompare(a));
	}, [data]);

	// 로딩 중일 때
	if (isLoading) return <div className="flex-1 bg-white" />;
	if (data.length === 0) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center h-full bg-white">
				<p className="text-[var(--color-neutral-500)] text-medium-16">
					피팅 내역이 없습니다
				</p>
			</div>
		);
	}

	return (
		<main className="flex-1 overflow-y-auto bg-white pb-20 no-scrollbar">
			{months.map((month) => (
				<section
					key={month}
					className="mt-8 px-4"
				>
					{/* 월별 헤더 */}
					<h2 className="mb-4 text-[var(--color-neutral-900)] text-medium-16 font-bold leading-normal">
						{month}
					</h2>
                    
					{/* 3열 사진 그리드 */}
					<div className="grid grid-cols-3 gap-x-[10px] gap-y-4">
						{data
							.filter((item) => formatToMonthGroup(item.createdAt) === month)
							.map((item) => {
								const targetId = item.id || item.fittingId;
                                
								return (
									<div
										key={targetId}
										role="button"
										tabIndex={0}
										onClick={() => navigate(PATH.FITTING_DETAIL.replace(':id', String(targetId)))}
										onKeyDown={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												navigate(PATH.FITTING_DETAIL.replace(':id', String(targetId)));
											}
										}}
										className="w-full aspect-[3/4] rounded-[10px] overflow-hidden relative cursor-pointer active:scale-95 transition-transform outline-none focus:ring-2 focus:ring-primary-500 bg-[var(--color-neutral-100)] shadow-sm"
									>
										<img
											src={item.fittingResultImage}
											alt="피팅 결과물"
											className="w-full h-full object-cover"
											loading="lazy"
										/>
										<div className="absolute bottom-2 w-full text-center">
											<span className="text-white text-[10px] font-medium drop-shadow-md">
												{new Date(item.createdAt).toLocaleDateString('ko-KR').replace(/\. /g, '.').replace(/\.$/, '')}
											</span>
										</div>
									</div>
								);
							})}
					</div>
				</section>
			))}
		</main>
	);
};

export default RecentFitting;
