import { getProductDetail } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useProductsDetail(productId : number) {
	return useQuery({
		queryKey : QUERY_KEYS.PRODUCT.DETAIL(productId),
		queryFn : () => getProductDetail(productId),
	})

}

export default useProductsDetail;
