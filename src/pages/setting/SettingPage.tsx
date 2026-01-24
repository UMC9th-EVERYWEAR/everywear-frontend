import { Modal } from '@/src/components/common/Modal';
import AccountSection from '@/src/components/setting/setting/AccountSection';
import FooterActions from '@/src/components/setting/setting/FooterActions';
import NotificationSection from '@/src/components/setting/setting/Notification';
import SupportSection from '@/src/components/setting/setting/SupportSection';
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
				<AccountSection
					openLoginSetting={openLoginSetting}
					toggleLoginSetting={toggleLoginSetting}
					linkedSocialAccounts={linkedSocialAccounts}
					toggleSocialLink={toggleSocialLink}
					onChangePhoto={goChangePhoto}
				/>
				
				<NotificationSection
					enabled={isNotificationEnabled}
					onToggle={toggleNotification}
				/>
				<SupportSection
					onInquiry={() => navigate(PATH.SETTING.INQUIRY)}
				/>
			</div>
		</div>

		<FooterActions
			onLogout={goInquiry}
			onWithdraw={goWithdraw}
		/>


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
