import arrowRight from '@/public/svgs/arrow-right.svg';
import { useState } from 'react';
const SettingPage = () => {
	const [openLoginSetting, setOpenLoginSetting] = useState(false);
	const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);


	const toggleNotification = () =>
		setIsNotificationEnabled((prev) => !prev);

	return <div className="mt-5 mx-4 w-[calc(100%-32px)]">
		
		<div className=' text-neutral-900 flex flex-col gap-5' >
			<div>
				<div className='border-b py-1 border-neutral-900 text-medium-16'>회원정보</div>
				<div className='py-2 flex justify-between border-b-[0.5px] border-neutral-300 '>
					<span className='text-regular-14 flex items-center'>기본 사진 변경</span>
					<img
						src={arrowRight}
						alt="arrow right"
						className='cursor-pointer'

					/>
				</div>			
		

				<div className='py-2 flex justify-between border-b-[0.5px] border-neutral-300 '>
					<span className='text-regular-14 flex items-center'>간편 로그인 설정</span>
					<img
						src={arrowRight}
						alt="arrow right"
						className='cursor-pointer'
					/>
				</div>
			</div>

			<div>
				<div className='border-b py-1 border-neutral-900 text-medium-16'>알림</div>
				<div className='py-2 flex justify-between border-b-[0.5px] border-neutral-300 '>
					<span className='text-regular-14 flex items-center'>알림 설정</span>
					<button
						onClick={toggleNotification}
						className='w-10 h-5 bg-[#D9D9D9] rounded-full relative cursor-pointer'
					>
						<div className='bg-white w-4 h-4 rounded-full absolute top-0.5 left-[1.77px]'></div>
					</button>
				</div>			

			</div>
		</div></div>;
}

export default SettingPage;
