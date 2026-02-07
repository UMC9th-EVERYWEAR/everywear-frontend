export interface FittingRecord {
    id: number;
    resultImageUrl: string;
    createdAt: string;
    status: 'COMPLETED' | 'PROCESSING' | 'FAILED';
    usedItems: {
        id: number;
        name: string;
        category: string;
    }[];
}

const MOCK_FITTINGS: FittingRecord[] = [
	{
		id: 1,
		resultImageUrl: 'https://picsum.photos/seed/fitting1/300/400',
		createdAt: '2026-02-07T14:00:00Z',
		status: 'COMPLETED',
		usedItems: [{ id: 101, name: '베이직 코튼 셔츠', category: '상의' }],
	},
	{
		id: 2,
		resultImageUrl: 'https://picsum.photos/seed/fitting2/300/400',
		createdAt: '2026-02-07T15:30:00Z',
		status: 'COMPLETED',
		usedItems: [{ id: 102, name: '와이드 데님 팬츠', category: '하의' }],
	},
];

export const useFittings = () => ({
	data: MOCK_FITTINGS,
	isLoading: false,
});

// ✅ 상세 조회를 위한 훅 (반드시 export)
export const useFittingDetail = (id: number) => {
	const { data } = useFittings();
	const detail = data.find((item) => item.id === id);
	return {
		data: detail,
		isLoading: false,
	};
};
