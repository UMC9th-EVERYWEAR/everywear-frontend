import { useMutation } from '@tanstack/react-query';
import { verifyAndSaveProfileImage } from '@/src/apis/domain';
import { queryClient } from '@/src/lib/react-query';
import { QUERY_KEYS } from '@/src/constants/query-key';
import type { AxiosError } from 'axios';

export const useVerifyAndSaveProfileImage = () => {

	return useMutation({
		mutationFn: (file: File) => verifyAndSaveProfileImage(file),
		retry: (failureCount, error: AxiosError) => {
			if (error.response?.status === 400 || error.response?.status === 500 ) return false;
			return failureCount < 2;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.USER_IMAGES.ALL,
			});
		},
		onError: () => {
			console.error('🔥 에러')
		},
	});
};
