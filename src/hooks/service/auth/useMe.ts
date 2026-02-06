import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '@/src/apis/domain/user';
import { QUERY_KEYS } from '@/src/constants/query-key';

export const useMe = (enabled: boolean = true) => {
	return useQuery({
		queryKey: QUERY_KEYS.AUTH.USER,
		queryFn: getMyInfo,
		staleTime: 5 * 60 * 1000, // 5분간 데이터를 fresh로 유지
		gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
		retry: 1, // 인증 실패 시 재시도 횟수 제한
		enabled, // 조건부 활성화
	});
};
