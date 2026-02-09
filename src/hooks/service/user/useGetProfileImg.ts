import { getRepresentativeImage } from '@/src/apis/domain';
import { QUERY_KEYS } from '@/src/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetProfileImg() {
	return useQuery({
		queryKey : QUERY_KEYS.USER_IMAGES.REPRESENTATIVE,
		queryFn : getRepresentativeImage,
		select : (data) => ({
			representative_img : data.result?.representative_img,
		}),
		staleTime: 1000 * 60 * 5,
	})

}

export default useGetProfileImg;
