import { getProfileImages } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useProfileImages = () => {
	return useQuery({
		queryKey: QUERY_KEYS.USER_IMAGES.ALL,
		queryFn: getProfileImages,
	});
};
