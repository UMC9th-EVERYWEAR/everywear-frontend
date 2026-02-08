import Banner from '@/src/components/setting/setting-photo/Banners';
import CheckItem from '@/src/components/setting/setting-photo/CheckItem';
import InfoBox from '@/src/components/setting/setting-photo/InfoBox';
import { Modal } from '@/src/components/common/Modal';
import { cn } from '@/src/utils/cn';
import type { UserImgQuery } from '@/src/apis/generated';
import useToast from '@/src/hooks/domain/ai-fitting/UseToast';
import Toast from '../../common/Toast';
import ToastContainer from '../../common/ToastContainer';
import React from 'react';
import type { PendingUpload } from '@/src/pages/setting/setting-photo-page';
import type { Swiper as SwiperClass } from 'swiper/types';
import type { RefObject } from 'react';


interface Props {
  loading: boolean;
  photoItems: UserImgQuery[];
  activeRealIndex: number;
	activeImageId: number;
  isAddCardActive: boolean;
  openChangePhotoModal: boolean;
  openDeletePhotoModal: boolean;
  swiperRef: RefObject<SwiperClass | null>;
	setPendingUploads: React.Dispatch<React.SetStateAction<PendingUpload[]>>;
  onChangeIndex: (i: number) => void;
  onAddCardActiveChange: (v: boolean) => void;

  onOpenChangeModal: () => void;
  onCloseChangeModal: () => void;
  onOpenDeleteModal: () => void;
  onCloseDeleteModal: () => void;

  onSelectRepresentative: () => void;
  onDeleteImage: () => void;
}

const SettingPhotoView = ({
	loading,
	photoItems,
	activeRealIndex,
	activeImageId,
	isAddCardActive,
	openChangePhotoModal,
	openDeletePhotoModal,
	swiperRef,
	setPendingUploads,
	onChangeIndex,
	onAddCardActiveChange,
	onOpenChangeModal,
	onCloseChangeModal,
	onOpenDeleteModal,
	onCloseDeleteModal,
	onSelectRepresentative,
	onDeleteImage,
}: Props) => {
	const representativeId = photoItems.find((i)=> i.representative)?.profileImageId

	const { toasts, createToast, deleteToast } = useToast();

	const handleDeleteRepresentativeAttempt = () => {
		createToast({ message: '대표 사진은 삭제가 불가합니다.' });
	};

	const handleUploadStartNotice = () => {
		createToast({ message: '사진 분석을 시작하겠습니다.' })
	}

	const handleUploadError= () => {
		createToast({ message: '가상피팅에 적합하지 않은 이미지에요.' })
	}

	return (
		
		<div className="py-6 flex flex-col items-center text-neutral-900">
			<ToastContainer>
				{toasts.map((t) => (
					<Toast
						key={t.id}
						id={t.id}
						message={t.message}
						deleteToast={deleteToast}
					/>
				))}
			</ToastContainer>
			<InfoBox>
				<CheckItem text="최대 5개까지 사진을 등록할 수 있어요." />
				<CheckItem text="가상 피팅에 사용할 사진을 등록해주세요." />
			</InfoBox>

			<div className="block w-full py-3 mb-8">
				<Banner
					photoItems={photoItems}
					activeRealIndex={activeRealIndex}
					swiperRef={swiperRef}
					setActiveRealIndex={onChangeIndex}
					setIsAddCardActive={onAddCardActiveChange}
					setPendingUploads={setPendingUploads}
					handleUploadStartNotice={handleUploadStartNotice}
					handleError={handleUploadError}
				/>
			</div>

			<div className="mx-4 flex justify-between w-full max-w-[343px]">
				<button
					onClick={representativeId === activeImageId ? handleDeleteRepresentativeAttempt: onOpenDeleteModal}
					className={cn(
						'text-primary-600 border w-20 rounded-full h-11',
						isAddCardActive && 'text-neutral-400 pointer-events-none',
					)}
				>
					삭제하기
				</button>

				<button
					onClick={onOpenChangeModal}
					className={cn(
						'bg-primary-600 text-white w-63.25 rounded-full h-11',
						isAddCardActive && 'bg-neutral-400 pointer-events-none',
					)}
				>
					선택하기
				</button>
			</div>

			{!loading && openChangePhotoModal && (
				<Modal
					isOpen
					title="기본 사진을 변경하시겠습니까?"
					btn1Text="변경하기"
					btn1Action={onSelectRepresentative}
					btn2Text="취소"
					btn2Action={onCloseChangeModal}
					onClose={onCloseChangeModal}
				/>
			)}

			{openDeletePhotoModal && (
				<Modal
					isOpen
					title="사진을 삭제하시겠습니까?"
					btn1Text="삭제하기"
					btn1Action={onDeleteImage}
					btn2Text="취소"
					btn2Action={onCloseDeleteModal}
					onClose={onCloseDeleteModal}
				/>
			)}
		</div>
	);
};

export default SettingPhotoView;
