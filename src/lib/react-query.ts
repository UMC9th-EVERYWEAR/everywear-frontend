import { QueryClient } from '@tanstack/react-query';

/**
 * [Tanstack Query 전역 설정]
 * 서버 상태(Server State) 관리와 캐싱 전략을 여기서 컨트롤 -> useQuery,useMutation 사용시 기본옵션
 */
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// 데이터가 '신선하다'고 판단되는 시간을 설정 -> 우선 5분
			// 이 시간 동안은 동일한 요청 시 API를 호출하지 않고 캐시를 사용.
			staleTime: 1000 * 60 * 5,
      
			// 브라우저 창에 다시 포커스되었을 때 자동으로 데이터를 새로고침할지 여부
			refetchOnWindowFocus: false,
      
			// 요청 실패 시 재시도 횟수
			retry: 1,
		},
		// mutation 전역 설정 추가
		mutations: {
			// 요청 실패 시 재시도 횟수
			retry: 1,
		},
	},
});
