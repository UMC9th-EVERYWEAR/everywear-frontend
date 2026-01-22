import arrowRight from '@/public/svgs/arrow-right.svg';
import { Modal } from '@/src/components/common/Modal';
import { ArrowRightIcon } from '@/src/components/setting/ArrowRightIcon.';
import ToggleBtn from '@/src/components/setting/ToggleBtn';
import { PATH } from '@/src/router/path';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const SettingPage = () => {	
	const [openLoginSetting, setOpenLoginSetting] = useState(false);
	const [openLogoutSetting, setOpenLogoutSetting] = useState(false);
	
	const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
	const [linkedSocialAccounts, setLinkedSocialAccounts] = useState({
		naver: false,
		kakao: false,
		apple: false,
	});



	const toggleLoginSetting = () =>
		setOpenLoginSetting((prev) => !prev);

	const toggleNotification = () =>
		setIsNotificationEnabled((prev) => !prev);

	const toggleSocialLink = (provider: 'naver' | 'kakao' | 'apple') => {
		setLinkedSocialAccounts((prev) => ({
			...prev,
			[provider]: !prev[provider],
		}));
	};

	const navigate = useNavigate();
	const goChangePhoto = () => {
		navigate(PATH.SETTING.CHANGE_PHOTO);
	};

	const goInquiry = () => {
		navigate(PATH.SETTING.INQUIRY);
	};

	const goWithdraw = () => {
		navigate(PATH.SETTING.WITHDRAW);
	};

	return <div className="mt-5 mx-4 w-[calc(100%-32px)]">
		<div className='text-neutral-900  mb-7 '>
			<div className=' flex flex-col gap-5' >
			
				<div>
					<div className='border-b py-1 border-neutral-900 text-medium-16'>회원정보</div>
							
					<button
						onClick={goChangePhoto}
						className='py-2 w-full flex justify-between border-b-[0.5px] border-neutral-300 cursor-pointer'
					>
						<span className='text-regular-14 flex items-center'>기본 사진 변경</span>
						<img
							src={arrowRight}
							alt="arrow right"
							className='cursor-pointer'

						/>
					</button>			

					<button
						onClick={toggleLoginSetting}
						className='py-2 w-full flex justify-between border-b-[0.5px] border-neutral-300 '
					>
						<span className='text-regular-14 flex items-center'>간편 로그인 설정</span>
						<ArrowRightIcon rotated={openLoginSetting} />
					</button>

					{
						openLoginSetting && (
							<div className='flex flex-col gap-2 py-2'>
								<div className='flex justify-between'>
									<button className='text-regular-14 text-left'>네이버 로그인 연동</button>
									<ToggleBtn
										checked={linkedSocialAccounts.naver}
										onChange={() => toggleSocialLink('naver')}
									/>

								</div>
								<div className='flex justify-between'>

									<button className='text-regular-14 text-left'>카카오 로그인 연동</button>
									<ToggleBtn
										checked={linkedSocialAccounts.kakao}
										onChange={() => toggleSocialLink('kakao')}
									/>

								</div>

								<div className='flex justify-between'>

									<button className='text-regular-14 text-left'>애플 로그인 연동</button>
									<ToggleBtn
										checked={linkedSocialAccounts.apple}
										onChange={() => toggleSocialLink('apple')}
									/>

								</div>

							</div>
						)
					}
				</div>

				<div>
					<div className='border-b py-1 border-neutral-900 text-medium-16'>알림</div>
					<div className='py-2 flex justify-between border-b-[0.5px] border-neutral-300 '>
						<span className='text-regular-14 flex items-center'>알림 설정</span>
						<ToggleBtn
							checked={isNotificationEnabled}
							onChange={toggleNotification}
						/>
					</div>			

				</div>

			
				<div>
					<div className='border-b py-1 border-neutral-900 text-medium-16'>지원</div>
							
					<div className='py-2 flex justify-between border-b-[0.5px] border-neutral-300 '>
						<span className='text-regular-14 flex items-center'>서비스 이용약관</span>
						<img
							src={arrowRight}
							alt="arrow right"
							className='cursor-pointer'
						/>
					</div>			

					<div className='py-2 flex justify-between border-b-[0.5px] border-neutral-300 '>
						<span className='text-regular-14 flex items-center'>개인정보 처리방침</span>
						<img
							src={arrowRight}
							alt="arrow right"
							className='cursor-pointer'
						/>
					</div>

					<button 
						onClick={goInquiry}
						className='py-2 w-full flex justify-between border-b-[0.5px] border-neutral-300 cursor-pointer'
					>
						<span className='text-regular-14 flex items-center'>1:1 문의하기</span>
						<img
							src={arrowRight}
							alt="arrow right"
							className='cursor-pointer'
						/>
					</button>
				</div>

			</div>
		</div>

		<div className='text-neutral-700 flex flex-col items-start text-regular-12'>
			<button
				onClick={()=>setOpenLogoutSetting(true)}
				className='cursor-pointer py-1'
			>로그아웃</button>
			<button
				onClick={goWithdraw}
				className='cursor-pointer py-1'
			>회원탈퇴</button>
		</div>

		{
			openLogoutSetting && (
				<Modal
					isOpen={openLogoutSetting}
					title='로그아웃 하시겠습니까?'
					onClose={()=>setOpenLogoutSetting(false)}
					btn1Action={()=>setOpenLogoutSetting(false)} // TODO:로컬스토리지 삭제 후 로그인 화면 이동
					btn1Text='예'
					btn2Action={()=>setOpenLogoutSetting(false)}
					btn2Text='아니요'
				/> )
		}
	</div>;
}

export default SettingPage;
