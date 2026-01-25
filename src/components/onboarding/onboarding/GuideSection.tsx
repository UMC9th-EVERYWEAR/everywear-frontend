import { PATH } from '@/src/constants/path';
import { useNavigate } from 'react-router';
import Button from '../../common/Button';
import GuidePhoto from './GuidePhoto';

const GuideSection = () => {

	const navigate = useNavigate();
	const goPhoto = () => {
		navigate(PATH.ONBOARDING.PHOTO);
	};

	return (
		<div>
			<div className="border border-neutral-200 w-full rounded-sm px-2 py-5 flex flex-col items-center mb-5.5">

				<p className="text-medium-20 mb-1 text-black">인물 사진 업로드 가이드 라인</p>
				<p className="px-1 text-regular-14 text-center text-neutral-500 mb-3">최상의 결과를 얻으려면 당신의 인물 사진을 업로드할 때 아래 가이드라인을 따라주세요</p>
			
				<div className='grid grid-cols-2 grid-rows-2 gap-3'>
					<GuidePhoto
						rule={'SINGLE_SUBJECT'}
						variant='GOOD'
						hasText={true}
					/>
					<GuidePhoto
						rule={'SINGLE_SUBJECT'}
						variant='BAD'
						hasText={true}
					/>
					<GuidePhoto
						rule={'SIMPLE_POSE'}
						variant='GOOD'
						hasText={true}
					/>
					<GuidePhoto
						rule={'SIMPLE_POSE'}
						variant='BAD'
						hasText={true}
					/>
				</div>

				<div className='grid grid-cols-4 grid-rows-2 gap-3 mt-5'>
					<GuidePhoto
						variant='GOOD'
						hasText={false}
					/>	
					<GuidePhoto
						variant='GOOD'
						hasText={false}
					/>
					<GuidePhoto
						variant='GOOD'
						hasText={false}
					/>
					<GuidePhoto
						variant='GOOD'
						hasText={false}
					/>	
					<GuidePhoto
						variant='BAD'
						hasText={false}
					/>	
					<GuidePhoto
						variant='BAD'
						hasText={false}
					/>	
					<GuidePhoto
						variant='BAD'
						hasText={false}
					/>	
					<GuidePhoto
						variant='BAD'
						hasText={false}
					/>
				</div>
			</div>

			<Button onClick={goPhoto}>확인하기</Button>
		</div>
	)
}
export default GuideSection;
