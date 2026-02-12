import { getRecentFittingDetail } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useQuery } from '@tanstack/react-query';

interface useGetRecentFittingProps {
    productId : number;
    isEnabled? : boolean;
}

function useGetRecentFitting({ productId, isEnabled = false } : useGetRecentFittingProps) {
	return useQuery({
		queryKey: QUERY_KEYS.FITTING.DETAIL(productId),
		queryFn : () => getRecentFittingDetail(productId),
		enabled: isEnabled,
	})

}

export default useGetRecentFitting;
