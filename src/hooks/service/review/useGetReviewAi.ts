import { getAiReview } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetReviewAi(product_id: number, enabled: boolean) {
	return useQuery({
		queryKey: QUERY_KEYS.REVIEW.AI(product_id),
		queryFn: () => getAiReview(product_id),
        
		enabled: enabled, 

		refetchInterval: (query) => {
			const data = query.state.data;

			if (data?.summary || data?.message === 'AI 리뷰 조회 성공') {
				return false;
			}
			return 5000; 
		},
        
		refetchIntervalInBackground: true,
	});
}

export default useGetReviewAi;
