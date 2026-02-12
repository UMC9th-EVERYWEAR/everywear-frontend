import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { selectRepresentativeImage } from '@/src/apis/domain';
import { queryClient } from '@/src/lib/react-query';


export const useSelectRepresentativeImage = () => {

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
