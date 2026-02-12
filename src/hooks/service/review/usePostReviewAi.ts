import { generateAiReview } from '@/src/apis/domain'; 
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ToastInput } from '../../domain/ai-fitting/useToast';

interface usePostAiReviewProps {
	createToast : (toast : ToastInput) => void;
}

interface AiReviewVariable {
  productId: number;
}

function usePostAiReview({ createToast } : usePostAiReviewProps) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ productId }: AiReviewVariable) => generateAiReview(productId),

		onSuccess: (data, variables) => {
			queryClient.setQueryData(
				QUERY_KEYS.REVIEW.AI(variables.productId), 
				data,
			);
		},
		onError: () => {
			createToast({ message : '리뷰 수가 부족하여 AI 리뷰 요약에 실패했습니다.' })
		},
	});
}

export default usePostAiReview;
