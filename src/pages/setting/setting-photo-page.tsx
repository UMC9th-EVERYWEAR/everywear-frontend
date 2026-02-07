import { useState } from 'react';
import { useProfileImages } from '@/src/hooks/service/user/useProfileImages';
import type { UserImgQuery } from '@/src/apis/generated';
import { useSelectRepresentativeImage } from '@/src/hooks/service/user/useSelectRepresentativeImage';
import { useDeleteProfileImage } from '@/src/hooks/service/user/useDeleteProfileImage';
import SettingPhotoView from '@/src/components/setting/setting-photo/SettingPhotoView';

const MAX_PHOTOS = 5;

export type PendingUpload = {
  tempId: number;        // 음수 id
  previewUrl: string;
};


const SettingPhotoPage = () => {
	const { data: profileData, isLoading: profileLoading } = useProfileImages();
	const { mutate: selectRepresentative } = useSelectRepresentativeImage();
	const { mutate: deleteImage } = useDeleteProfileImage();
	const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);

	const [openChangePhotoModal, setOpenChangePhotoModal] = useState(false);
	const [openDeletePhotoModal, setOpenDeletePhotoModal] = useState(false); // 사진 삭제 후 서버 값으로 초기화
	const [activeRealIndex, setActiveRealIndex] = useState(0);
	const [isAddCardActive, setIsAddCardActive] = useState(false); 

	
	{/* 5칸짜리 UI 배열 */}
	const filledPhotoItems: UserImgQuery[] = (() => {
		const items = profileData ?? [];

		const uploadingPhotos : UserImgQuery[] = pendingUploads.map((p) => ({
			id: p.tempId,
			imageUrl: p.previewUrl,
			representative: false,	
		}));
		const emptySlots: UserImgQuery[] = Array.from(
			{ length: Math.max(0, MAX_PHOTOS - (items.length + uploadingPhotos.length)) },
			(_, index) => ({ profileImageId: -(index + 1000) }),
		);
		return [...items, ...uploadingPhotos, ...emptySlots];
	})();

	const activeImageId =
	filledPhotoItems[activeRealIndex]?.profileImageId;


	return (
		<SettingPhotoView
			loading={profileLoading}
			photoItems={filledPhotoItems}
			setPendingUploads={setPendingUploads}
			activeRealIndex={activeRealIndex}
			activeImageId={activeImageId ?? 0}
			isAddCardActive={isAddCardActive}
			openChangePhotoModal={openChangePhotoModal}
			openDeletePhotoModal={openDeletePhotoModal}
			onChangeIndex={setActiveRealIndex}
			onAddCardActiveChange={setIsAddCardActive}
			onOpenChangeModal={() => setOpenChangePhotoModal(true)}
			onCloseChangeModal={() => setOpenChangePhotoModal(false)}
			onOpenDeleteModal={() => setOpenDeletePhotoModal(true)}
			onCloseDeleteModal={() => setOpenDeletePhotoModal(false)}
			onSelectRepresentative={() => {
				if (!activeImageId) return;
				selectRepresentative(activeImageId, {
					onSuccess: () => setOpenChangePhotoModal(false),
				});
			}}
			onDeleteImage={() => {
				if (!activeImageId) return;
				deleteImage(activeImageId, {
					onSuccess: () => {
						setOpenDeletePhotoModal(false);
						setActiveRealIndex(0);
					},
				});
			}}
		/>
	);
};
export default SettingPhotoPage;
