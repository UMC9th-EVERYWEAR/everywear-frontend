import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { selectRepresentativeImage } from '@/src/apis/domain';

export const useSelectRepresentativeImage = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (imageId: number) =>
			selectRepresentativeImage(imageId),

		onSuccess: () => {
			// 대표사진 변경 후 → 프로필 이미지 목록 갱신
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.USER_IMAGES.ALL,
			});
		},
	});
};
