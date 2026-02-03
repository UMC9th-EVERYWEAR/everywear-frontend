import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { verifyAndSaveProfileImage } from '@/src/apis/domain';
import { queryClient } from '@/src/lib/react-query';

export const useVerifyAndSaveProfileImage = () => {
	// const navigate = useNavigate();

	return useMutation({
		mutationFn: (file: File) => verifyAndSaveProfileImage(file),

		onSuccess: () => {
			// navigate(PATH.ONBOARDING.PHOTO);
			queryClient.invalidateQueries({
				queryKey: ['profile-images'],
			});
		},

		onError: (error) => {
			// 서버에서 "부적합 이미지" 응답 오는 경우 대비
			console.error('verifyAndSaveProfileImage failed', error);
		},
	});
};
