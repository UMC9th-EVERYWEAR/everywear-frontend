import Banner from '@/src/components/setting/setting-photo/Banners';
import CheckItem from '@/src/components/setting/setting-photo/CheckItem';
import InfoBox from '@/src/components/setting/setting-photo/InfoBox';
import { Modal } from '@/src/components/common/Modal';
import { cn } from '@/src/utils/cn';
import type { UserImgQuery } from '@/src/apis/generated';

interface Props {
  loading: boolean;
  photoItems: UserImgQuery[];
  activeRealIndex: number;
  isAddCardActive: boolean;
  openChangePhotoModal: boolean;
  openDeletePhotoModal: boolean;

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
	isAddCardActive,
	openChangePhotoModal,
	openDeletePhotoModal,
	onChangeIndex,
	onAddCardActiveChange,
	onOpenChangeModal,
	onCloseChangeModal,
	onOpenDeleteModal,
	onCloseDeleteModal,
	onSelectRepresentative,
	onDeleteImage,
}: Props) => {
	return (
		<div className="pt-6 flex flex-col items-center text-neutral-900">
			<InfoBox>
				<CheckItem text="최대 5개까지 사진을 등록할 수 있어요." />
				<CheckItem text="가상 피팅에 사용할 사진을 등록해주세요." />
			</InfoBox>

			<div className="block w-full py-3 mb-8">
				<Banner
					photoItems={photoItems}
					activeRealIndex={activeRealIndex}
					setActiveRealIndex={onChangeIndex}
					setIsAddCardActive={onAddCardActiveChange}
				/>
			</div>

			<div className="mx-4 flex justify-between w-full max-w-[343px]">
				<button
					onClick={onOpenDeleteModal}
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
