import { useMemo } from 'react';
import { useNavigate } from 'react-router'; 
import { formatToMonthGroup } from '@/src/utils/date';
import { useFittings } from '@/src/hooks/service/fitting/useFittings';
import { PATH } from '@/src/constants/path';

const RecentFitting = () => {
	const navigate = useNavigate();
	const { data = [], isLoading } = useFittings();

	const months = useMemo(() => {
		if (!data.length) return [];
		const uniqueMonths = Array.from(new Set(data.map((item) => formatToMonthGroup(item.createdAt))));
		return uniqueMonths.sort((a, b) => b.localeCompare(a));
	}, [data]);

	if (isLoading) return <div className="flex-1 bg-white" />;

	return (
		<main className="flex-1 overflow-y-auto bg-white pb-20 no-scrollbar">
			{months.map((month) => (
				<section
					key={month}
					className="mt-8 px-4"
				>
					{/* 월별 타이틀 */}
					<h2 className="mb-4 text-[var(--color-neutral-900)] text-medium-16 font-bold leading-normal">
						{month}
					</h2>
                    
					<div className="grid grid-cols-3 gap-x-[10px] gap-y-4">
						{data
							.filter((item) => formatToMonthGroup(item.createdAt) === month && item.status === 'COMPLETED')
							.map((item) => (
								<div
									key={item.id}
									role="button"
									tabIndex={0}
									onClick={() => navigate(PATH.FITTING_DETAIL.replace(':id', String(item.id)))}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											navigate(PATH.FITTING_DETAIL.replace(':id', String(item.id)));
										}
									}}
									className="w-full aspect-[3/4] rounded-[10px] overflow-hidden relative cursor-pointer active:scale-95 transition-transform outline-none focus:ring-2 focus:ring-primary-500 bg-[var(--color-neutral-100)] shadow-sm"
								>
									<img
										src={item.resultImageUrl}
										alt="피팅 결과물"
										className="w-full h-full object-cover"
										loading="lazy"
									/>
                                    
									{/* 날짜 표시 레이어 */}
									<div className="absolute bottom-2 w-full text-center">
										<span className="text-white text-[10px] font-medium drop-shadow-md">
											{new Date(item.createdAt).toLocaleDateString('ko-KR', {
												year: 'numeric',
												month: 'numeric',
												day: 'numeric',
											}).replace(/\. /g, '.').replace(/\.$/, '')}
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
