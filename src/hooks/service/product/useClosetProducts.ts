import { getClosetBottomProducts, getClosetByCategory, getClosetDressProducts, getClosetEtcProducts, getClosetOuterProducts, getClosetProducts, getClosetTopProducts } from '@/src/apis/domain'
import { QUERY_KEYS } from '@/src/constants/query-key'
import { PRODUCT_CATEGORIES, type CategoryKey } from '@/src/types/products/product'
import { useQuery } from '@tanstack/react-query'

// 내 옷장 전체
export const useClosetProducts = () => {
	useQuery({
		queryKey: QUERY_KEYS.CLOSET.ALL,
		queryFn: getClosetProducts,
	})
}

// 내 옷장 상의
export const useClosetTopProducts = () => {
	useQuery({
		queryKey: QUERY_KEYS.CLOSET.CATEGORY('top'),
		queryFn: getClosetTopProducts,
	})
}

// 내 옷장 아우터
export const useClosetOuterProducts = () => {
	useQuery({
		queryKey: QUERY_KEYS.CLOSET.CATEGORY('outer'),
		queryFn: getClosetOuterProducts,
	})
}

// 내 옷장 기타
export const useClosetEtcProducts = () => {
	useQuery({
		queryKey: QUERY_KEYS.CLOSET.CATEGORY('etc'),
		queryFn: getClosetEtcProducts,
	})
}

// 내 옷장 원피스
export const useClosetDressProducts = () => {
	useQuery({
		queryKey: QUERY_KEYS.CLOSET.CATEGORY('dress'),
		queryFn: getClosetDressProducts,
	})
}

// 내 옷장 하의
export const useClosetBottomProducts = () => {
	useQuery({
		queryKey: QUERY_KEYS.CLOSET.CATEGORY('bottom'),
		queryFn: getClosetBottomProducts,
	})
}

// 내 옷장 카테고리별
export const useClosetsProductsByCategory = (category: CategoryKey) => {
	const queryKeyCategory = PRODUCT_CATEGORIES[category].queryKey;
	return useQuery({
		queryKey: QUERY_KEYS.CLOSET.CATEGORY(queryKeyCategory),
		queryFn: () => getClosetByCategory(category),
	});
};
