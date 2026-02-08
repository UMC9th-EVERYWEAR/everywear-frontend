import type { UserImgQuery } from '@/src/apis/generated';
import type { PendingUpload } from '@/src/pages/setting/setting-photo-page';

const MAX_PHOTOS = 5;

interface usePhotoItemsProps{
profileData: UserImgQuery[];
pendingUploads: PendingUpload[];
activeRealIndex: number;

}
export function usePhotoItems ({ profileData, pendingUploads, activeRealIndex }:usePhotoItemsProps) {
	const filledPhotoItems: UserImgQuery[] = (() => {
		const items = profileData ?? [];
		const representativeItem = items.find((i)=> i.representative)
		const restItems = items.filter((i) => !i.representative);

		const sortedItems = representativeItem ?  [representativeItem, ...restItems] : items;

		const uploadingPhotos : UserImgQuery[] = pendingUploads.map((p) => ({
			profileImageId: p.tempId,
			imageUrl: p.previewUrl,
			representative: false,
		}));
		const emptySlots: UserImgQuery[] = Array.from(
			{ length: Math.max(0, MAX_PHOTOS - (items.length + uploadingPhotos.length)) },
			(_, index) => ({ profileImageId: -(index + 1000) }),
		);
		return [...sortedItems, ...uploadingPhotos, ...emptySlots];
	})();


	const activeImageId =
	filledPhotoItems[activeRealIndex]?.profileImageId;
	return { photoItems: filledPhotoItems, activeImageId }
}
