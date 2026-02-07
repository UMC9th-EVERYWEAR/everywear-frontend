import { useMemo } from 'react';
import { useNavigate } from 'react-router'; 
import { formatToMonthGroup } from '@/src/utils/date';
import { useFittings } from '@/src/hooks/service/fitting/useFittings';

const RecentFitting = () => {
	const navigate = useNavigate();
	const { data, isLoading } = useFittings();

	const months = useMemo(() => {
		if (!data || data.length === 0) return [];

		const uniqueMonths = Array.from(
			new Set(data.map((item) => formatToMonthGroup(item.createdAt))),
		);

		return uniqueMonths.sort((a, b) => b.localeCompare(a));
	}, [data]);

	if (isLoading) {
		return <div className="flex-1 bg-white" />;
	}

	if (!data || data.length === 0) {
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
					className="mt-8"
				>
					<h2 className="px-4 mb-4 text-[var(--color-neutral-900)] text-medium-16 font-bold leading-normal">
						{month}
					</h2>

					<div className="flex gap-[10px] overflow-x-auto no-scrollbar pl-4 pr-4">
						{data
							.filter(
								(item) =>
									formatToMonthGroup(item.createdAt) === month &&
                  item.status === 'COMPLETED',
							)
							.map((item) => (
								<div
									key={item.id}
									role="button"
									tabIndex={0}
									onClick={() => navigate(`/fitting/${item.id}`)} 
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') navigate(`/fitting/${item.id}`);
									}}
									className="min-w-[calc((100%-32px-20px)/2.5)] aspect-[3/4] rounded-[10px] overflow-hidden bg-[var(--color-neutral-100)] shrink-0 relative cursor-pointer active:scale-95 transition-transform outline-none"
								>
									<img
										src={item.resultImageUrl}
										alt="피팅 이미지"
										className="w-full h-full object-cover"
										loading="lazy" 
									/>

									<div className="absolute bottom-2 w-full text-center">
										<span className="text-[var(--color-neutral-50)] text-regular-14 font-medium drop-shadow-md">
											{new Date(item.createdAt).toLocaleDateString('ko-KR').replace(/\.$/, '')}
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
