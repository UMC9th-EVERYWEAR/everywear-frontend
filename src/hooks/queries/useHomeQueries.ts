import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { getMyFittings } from '@/src/apis/domain/fitting'; 
import { getProducts } from '@/src/apis/domain/product';

export const useRecentFittingsQuery = () => {
	return useQuery({
		queryKey: QUERY_KEYS.FITTING.RECENT,
		queryFn: getMyFittings, 
		placeholderData: [],
	});
};

export const useHomeProductsQuery = () => {
	return useQuery({
		queryKey: QUERY_KEYS.PRODUCT.LIST,
		queryFn: getProducts, 
	});
};
