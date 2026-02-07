

// 피팅 데이터 타입 정의 (예상안)
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

// 목 데이터
const MOCK_FITTINGS: FittingRecord[] = [
	{
		id: 1,
		resultImageUrl: 'https://via.placeholder.com/300x400',
		createdAt: '2026-02-07T14:00:00Z',
		status: 'COMPLETED',
		usedItems: [{ id: 101, name: '베이직 코튼 셔츠', category: '상의' }],
	},
	{
		id: 2,
		resultImageUrl: 'https://via.placeholder.com/300x400',
		createdAt: '2026-02-07T15:30:00Z',
		status: 'COMPLETED',
		usedItems: [{ id: 102, name: '와이드 데님 팬츠', category: '하의' }],
	},
];

export const useFittings = () => {
	// 실제 연동 시에는 여기에 axiosInstance.get('/api/fitting/me') 등이 들어갑니다.
	return {
		data: MOCK_FITTINGS,
		isLoading: false,
	};
};
