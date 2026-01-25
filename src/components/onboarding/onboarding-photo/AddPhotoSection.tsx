import Button from '../../common/Button';
import PhotoBtn from './PhotoBtn';

interface AddPhotoSectionProps {
  setShowGuide: () => void;
}

const AddPhotoSection = ({ setShowGuide } : AddPhotoSectionProps) => {
	const hasFile = false
	return(
		<div className="px-5 pt-4 flex justify-center flex-col items-center">
			<div className='flex flex-col gap-4'>
				<div className="border w-85 border-neutral-200  rounded-sm px-8 py-5 flex flex-col items-center mb-5.5">
					<p className='text-neutral-500 text-regular-12 text-end w-full mb-3'><button
						onClick={setShowGuide}
						className='hover:underline cursor-pointer'
					                                                                     >
						사진 등록 가이드
					</button>
					</p>
					<p className='text-neutral-900 mb-2.5'>한명만 나온 사진을 등록해주세요!</p>

					<div className="border-dashed border w-full border-neutral-500 rounded-lg h-84 bg-onboarding-photo flex justify-center items-center text-neutral-600">
						{/* 사진을 추가해주세요! 등 멘트 수정 필요해보임 */}
					</div>
				</div>

				<div className='flex w-full gap-2 justify-center'>
					<PhotoBtn btnType='CAMERA'/>
					<PhotoBtn btnType='GALLERY' />
				</div>
				<Button disabled={!hasFile}>확인하기</Button>

			</div>

		</div>
	)
}
export default AddPhotoSection
