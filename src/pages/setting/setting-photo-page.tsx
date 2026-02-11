import {  useRef, useState } from 'react';
import { useProfileImages } from '@/src/hooks/service/user/useProfileImages';
import { useSelectRepresentativeImage } from '@/src/hooks/service/user/useSelectRepresentativeImage';
import { useDeleteProfileImage } from '@/src/hooks/service/user/useDeleteProfileImage';
import SettingPhotoView from '@/src/components/setting/setting-photo/SettingPhotoView';
import type { Swiper as SwiperClass } from 'swiper/types';
import { usePhotoItems } from '@/src/hooks/domain/setting/usePhotoItems';


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
	const [openDeletePhotoModal, setOpenDeletePhotoModal] = useState(false); 
	const [activeRealIndex, setActiveRealIndex] = useState(0);
	const [isAddCardActive, setIsAddCardActive] = useState(false); 
	const swiperRef = useRef<SwiperClass | null>(null)

	const handleSelectRepresentative = () => {
		if (!activeImageId) return;

		selectRepresentative(activeImageId, {
			onSuccess: () => {
				setOpenChangePhotoModal(false);
				swiperRef.current?.slideToLoop(0);
			},
		});
	};

	const handleDeleteImage = () => {
		if (!activeImageId) return;

		deleteImage(activeImageId, {
			onSuccess: () => {
				setOpenDeletePhotoModal(false);
				setActiveRealIndex(0);
			},
		});
	};

	{/* 5칸짜리 UI 배열 */}
	const { photoItems, activeImageId, itemIds } = usePhotoItems({ profileData: profileData ?? [], pendingUploads, activeRealIndex })


	return (
		<SettingPhotoView
			loading={profileLoading}
			photoItems={photoItems}
			setPendingUploads={setPendingUploads}
			activeRealIndex={activeRealIndex}
			activeImageId={activeImageId ?? 0}
			isAddCardActive={isAddCardActive}
			openChangePhotoModal={openChangePhotoModal}
			openDeletePhotoModal={openDeletePhotoModal}
			swiperRef={swiperRef}
			itemIds={itemIds}
			onChangeIndex={setActiveRealIndex}
			onAddCardActiveChange={setIsAddCardActive}
			onOpenChangeModal={() => setOpenChangePhotoModal(true)}
			onCloseChangeModal={() => setOpenChangePhotoModal(false)}
			onOpenDeleteModal={() => setOpenDeletePhotoModal(true)}
			onCloseDeleteModal={() => setOpenDeletePhotoModal(false)}
			onSelectRepresentative={handleSelectRepresentative}
			onDeleteImage={handleDeleteImage}
		/>
	);
};
export default SettingPhotoPage;
