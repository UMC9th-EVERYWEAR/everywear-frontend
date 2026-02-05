import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/src/apis/common/apiClient';
import { QUERY_KEYS } from '@/src/constants/query-key';

/**
 * [최근 피팅 내역 6개 조회 훅]
 */
export const useRecentFittingsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.FITTING.RECENT, // ['fitting', 'recent']
    queryFn: async () => {
      const { data } = await apiClient.getRecentFittings();
      return data.result ?? []; 
    },
    placeholderData: [], // 로딩 중 빈 배열 반환
  });
};

/**
 * [홈 화면 상품 6개 조회 훅]
 */
export const useHomeProductsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCT.LIST,
    queryFn: async () => {
      const { data } = await apiClient.getHomeProducts();
      // 명세서 구조상 data.result.products가 있을 수도, data.result가 리스트일 수도 있습니다.
      return data.result?.products ?? (Array.isArray(data.result) ? data.result : []);
    },
  });
};