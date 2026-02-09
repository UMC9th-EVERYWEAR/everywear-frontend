import { QUERY_KEYS } from '@/src/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useProductsDetail() {
	return useQuery({
		queryKey : QUERY_KEYS.PRODUCT,
	})

}

export default useProductsDetail;
