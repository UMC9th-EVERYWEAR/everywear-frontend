import { useQuery } from '@tanstack/react-query';
import { Api } from '@/src/apis/generated/Api';

const api = new Api();

export const useFittings = () => {
	return useQuery({
		queryKey: ['fittings'],
		queryFn: async () => {
			const response = await api.getMyFittings();
			console.log('목록 응답 데이터:', response.data);
			return response.data.result || []; 
		},
	});
};

export const useFittingDetail = (id: number) => {
	return useQuery({
		queryKey: ['fittingDetail', id],
		queryFn: async () => {
			const response = await api.getFittingDetail(id);
            
			console.log('상세 응답 데이터:', response.data);
            
			return response.data.result;
		},
		enabled: !!id,
	});
};
