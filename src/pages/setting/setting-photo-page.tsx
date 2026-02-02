import { Modal } from '@/src/components/common/Modal';
import Banner from '@/src/components/setting/setting-photo/Banners';
import CheckItem from '@/src/components/setting/setting-photo/CheckItem';
import InfoBox from '@/src/components/setting/setting-photo/InfoBox';
import dummy from '@/public/svgs/setting/dummyphoto.jpeg';

import type { PhotoItem } from '@/src/types/schemas/setting/setting-photo';
import { useState } from 'react';
import { cn } from '@/src/utils/cn';
// 더미 데이터
const PHOTO_ITEMS_DUMMY: PhotoItem[] = [
	{ isDefault: true, imageUrl: dummy },
	{ isDefault: false, imageUrl: dummy },
	{ isDefault: false, imageUrl: dummy },
	{ isDefault: false, imageUrl: '' },
	{ isDefault: false, imageUrl: '' }, //  이미지 없음 => AddCard 렌더링
];

const SettingPhotoPage = () => {
	const [openChangePhotoModal, setOpenChangePhotoModal] = useState(false);
	const [openDeletePhotoModal, setOpenDeletePhotoModal] = useState(false); // 사진 삭제 후 서버 값으로 초기화
	const [activeRealIndex, setActiveRealIndex] = useState(0);


	const [isAddCardActive, setIsAddCardActive] = useState(false); 
	const [photoItems, setPhotoItems] = useState<PhotoItem[]>(PHOTO_ITEMS_DUMMY);


	return (
		<div className="pt-6 flex flex-col items-center text-neutral-900">
			<InfoBox>
				<CheckItem text="최대 5개까지 사진을 등록할 수 있어요." />
				<CheckItem text="가상 피팅에 사용할 사진을 등록해주세요." />
				<CheckItem text="최대 5개까지 사진을 등록할 수 있어요." />
			</InfoBox>
			<div className='block w-full max-[480px] min-w-0 py-3 mb-8'>
				<Banner
					photoItems={photoItems}
					activeRealIndex={activeRealIndex}
					setActiveRealIndex={setActiveRealIndex}
					setIsAddCardActive={setIsAddCardActive}
					setPhotoItems={setPhotoItems}
				/>
			</div>
			<div className='mx-4 flex justify-between w-full max-w-[343px]'>
				<button
					onClick={() => setOpenDeletePhotoModal(true)}
					className={cn('text-regular-16 text-primary-600 p-2.5 border-[1.5px] w-20 rounded-full h-11 break-keep text-center flex items-center hover:opacity-80 cursor-pointer',
						isAddCardActive ? 'text-neutral-400 pointer-events-none' : '',
					)}
				>삭제하기</button>
				<button
					onClick={() => setOpenChangePhotoModal(true)}
					className={cn('text-regular-16 bg-primary-600 text-white p-2.5 border w-63.25 rounded-full h-11 break-keep justify-center flex items-center hover:opacity-90 cursor-pointer',
						isAddCardActive ? 'bg-neutral-400 pointer-events-none' : '',
					)}
				>선택하기</button>
			</div>
			{
				openChangePhotoModal && <Modal
					isOpen={openChangePhotoModal}
					onClose={()=>setOpenChangePhotoModal(false)}
					title="기본 사진을 변경하시겠습니까?"
					btn1Text="변경하기"
					btn1Action={()=>setOpenChangePhotoModal(false)} // TODO: api로 사진 변경 요청
					btn2Text="취소"
					btn2Action={()=>setOpenChangePhotoModal(false)} 
				                        />
			}

			{
				openDeletePhotoModal && <Modal
					isOpen={openDeletePhotoModal}
					onClose={()=>setOpenDeletePhotoModal(false)}
					title="사진을 삭제하시겠습니까?"
					btn1Text="삭제하기"
					btn1Action={()=>setOpenDeletePhotoModal(false)} // TODO: api로 사진 삭제 요청
					btn2Text="취소"
					btn2Action={()=>setOpenDeletePhotoModal(false)} 
				                        />	
			}
		</div>
	);
}
export default SettingPhotoPage;
