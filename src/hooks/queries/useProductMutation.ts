import { useMutation } from '@tanstack/react-query';
import { importProduct } from '@/src/apis/domain/product';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { queryClient } from '@/src/lib/react-query';

export const useImportProductMutation = () => {

	return useMutation({
		// 실제 API 호출 함수
		mutationFn: (data: { product_url: string }) => importProduct(data),
		onSuccess: () => {
			// 상품 목록 쿼리를 무효화하여 최신 리스트를 불러오게 함
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCT.ALL });
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLOSET.LIST });
		},
	});
};
