import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { deleteProfileImage } from '@/src/apis/domain';
import { queryClient } from '@/src/lib/react-query';

export const useDeleteProfileImage = () => {

	return useMutation({
		mutationFn: (imageId: number) => deleteProfileImage(imageId),

		onSuccess: () => {
			// 프로필 이미지 목록 다시 조회
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.USER_IMAGES.ALL,
			});
		},
	});
};
