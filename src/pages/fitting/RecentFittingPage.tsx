// import { useMemo } from 'react';
// import { useNavigate } from 'react-router'; 
// import { formatToMonthGroup } from '@/src/utils/date';
// import { useFittings } from '@/src/hooks/service/fitting/useFittings';
// import { PATH } from '@/src/constants/path';

// const RecentFitting = () => {
// 	const navigate = useNavigate();
// 	const { data = [], isLoading } = useFittings();

// 	const months = useMemo(() => {
// 		if (!data.length) return [];
// 		const uniqueMonths = Array.from(new Set(data.map((item) => formatToMonthGroup(item.createdAt))));
// 		return uniqueMonths.sort((a, b) => b.localeCompare(a));
// 	}, [data]);

// 	if (isLoading) return <div className="flex-1 bg-white" />;

// 	return (
// 		<main className="flex-1 overflow-y-auto bg-white pb-20 no-scrollbar">
// 			{months.map((month) => (
// 				<section
// 					key={month}
// 					className="mt-8"
// 				>
// 					<h2 className="px-4 mb-4 text-[var(--color-neutral-900)] font-bold">{month}</h2>
// 					<div className="flex gap-[10px] overflow-x-auto no-scrollbar pl-4 pr-4">
// 						{data
// 							.filter((item) => formatToMonthGroup(item.createdAt) === month && item.status === 'COMPLETED')
// 							.map((item) => (
// 								<div
// 									key={item.id}
// 									role="button"
// 									tabIndex={0}
// 									// 💡 핵심: :id를 실제 숫자로 치환
// 									onClick={() => navigate(PATH.AI_FITTING.DETAIL.replace(':id', String(item.id)))}
// 									className="min-w-[calc((100%-32px-20px)/2.5)] aspect-[3/4] rounded-[10px] overflow-hidden relative cursor-pointer active:scale-95 transition-transform"
// 								>
// 									<img
// 										src={item.resultImageUrl}
// 										alt="피팅"
// 										className="w-full h-full object-cover"
// 									/>
// 									<div className="absolute bottom-2 w-full text-center">
// 										<span className="text-white text-regular-14 drop-shadow-md">
// 											{new Date(item.createdAt).toLocaleDateString('ko-KR').replace(/\.$/, '')}
// 										</span>
// 									</div>
// 								</div>
// 							))}
// 					</div>
// 				</section>
// 			))}
// 		</main>
// 	);
// };

// export default RecentFitting;
