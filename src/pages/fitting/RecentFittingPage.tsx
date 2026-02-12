import { useMemo } from 'react';
import { useNavigate } from 'react-router'; 
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

	const groupedFittings = useMemo(() => {
		const groups: Record<string, FittingItem[]> = {};
		
		// 최신순 정렬
		const sortedData = [...data].sort((a, b) => 
			new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		);

		sortedData.forEach((item) => {
			const date = new Date(item.createdAt);
			const monthKey = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
			if (!groups[monthKey]) groups[monthKey] = [];
			groups[monthKey].push(item);
		});

		return Object.entries(groups);
	}, [data]);

	if (isLoading) return <div className="flex-1 bg-transparent" />;
	
	if (data.length === 0) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center h-full bg-transparent">
				<p className="text-[var(--color-neutral-500)] dark:text-gray-400 text-medium-16">
					피팅 내역이 없습니다
				</p>
			</div>
		);
	}

	return (
		<main className="flex-1 overflow-y-auto bg-transparent pb-20 no-scrollbar transition-colors duration-300">
			{groupedFittings.map(([month, items]) => (
				<section
					key={month}
					className="mt-8"
				>
					{/* 월별 타이틀 */}
					<h2 className="mb-4 px-4 text-[var(--color-neutral-900)] dark:text-white text-bold-18 font-bold">
						{month}
					</h2>
					
					{/* 가로 스크롤 컨테이너 */}
					<div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
						{items.map((item) => {
							const targetId = item.id || item.fittingId;
							const dateObj = new Date(item.createdAt);
							const dateString = `${dateObj.getFullYear()}.${dateObj.getMonth() + 1}.${dateObj.getDate()}`;

							return (
								<button
									key={targetId}
									onClick={() => navigate(PATH.FITTING_DETAIL.replace(':id', String(targetId)))}
									className="flex flex-col items-center min-w-[140px] max-w-[140px] shrink-0 cursor-pointer active:scale-[0.98] transition-transform outline-none"
								>
									<div className="w-full h-[210px] rounded-[15px] overflow-hidden relative bg-[var(--color-neutral-100)] dark:bg-gray-800 shadow-sm border border-black/5 dark:border-white/5">
										<img
											src={item.fittingResultImage}
											alt="피팅 결과물"
											className="w-full h-full object-cover"
											loading="lazy"
										/>
										
										<div className="absolute bottom-2.5 w-full text-center">
											<span className="text-white/90 text-[10px] font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
												{dateString}
											</span>
										</div>
									</div>
								</button>
							);
						})}
					</div>
				</section>
			))}
		</main>
	);
};

export default RecentFitting;
