import { useQuery } from '@tanstack/react-query';
import {
	getProducts,
	getTopProducts,
	getOuterProducts,
	getEtcProducts,
	getDressProducts,
	getBottomProducts,
	getProductsByCategory,
} from '@/src/apis/domain/product';
import { QUERY_KEYS } from '@/src/constants/query-key';
import type { CategoryKey } from '@/src/types/products/product';

/** 전체 상품 */
export const useProducts = () =>
	useQuery({
		queryKey: QUERY_KEYS.PRODUCT.ALL,
		queryFn: getProducts,
	});

/** 상의 */
export const useTopProducts = () =>
	useQuery({
		queryKey: QUERY_KEYS.PRODUCT.CATEGORY('top'),
		queryFn: getTopProducts,
	});

/** 아우터 */
export const useOuterProducts = () =>
	useQuery({
		queryKey: QUERY_KEYS.PRODUCT.CATEGORY('outer'),
		queryFn: getOuterProducts,
	});

/** 기타 */
export const useEtcProducts = () =>
	useQuery({
		queryKey: QUERY_KEYS.PRODUCT.CATEGORY('etc'),
		queryFn: getEtcProducts,
	});

/** 원피스 */
export const useDressProducts = () =>
	useQuery({
		queryKey: QUERY_KEYS.PRODUCT.CATEGORY('dress'),
		queryFn: getDressProducts,
	});

/** 하의 */
export const useBottomProducts = () =>
	useQuery({
		queryKey: QUERY_KEYS.PRODUCT.CATEGORY('bottom'),
		queryFn: getBottomProducts,
	});


//
export const useProductsByCategory = (category: CategoryKey) => {
	return useQuery({
		queryKey: QUERY_KEYS.PRODUCT.CATEGORY(category),
		queryFn: () => getProductsByCategory(category),
	});
};
