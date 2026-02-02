import AccountSection from '@/src/components/setting/setting/AccountSection';
import FooterActions from '@/src/components/setting/setting/FooterActions';
import LogoutModal from '@/src/components/setting/setting/LogooutModal';
import NotificationSection from '@/src/components/setting/setting/Notification';
import SupportSection from '@/src/components/setting/setting/SupportSection';
import  { PATH } from '@/src/constants/path';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const SettingPage = () => {	
	const [openLoginSetting, setOpenLoginSetting] = useState(false);
	const [openLogoutSetting, setOpenLogoutSetting] = useState(false);
	
	const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
	const [linkedSocialAccounts, setLinkedSocialAccounts] = useState({
		naver: false,
		kakao: false,
		google: false,
	});



	const toggleLoginSetting = () =>
		setOpenLoginSetting((prev) => !prev);

	const toggleNotification = () =>
		setIsNotificationEnabled((prev) => !prev);

	const toggleSocialLink = (provider: 'naver' | 'kakao' | 'google') => {
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
					onInquiry={goInquiry}
				/>
			</div>
		</div>

		<FooterActions
			onLogout={() => setOpenLogoutSetting(true)}
			onWithdraw={goWithdraw}
		/>

		<LogoutModal
			open={openLogoutSetting}
			onClose={() => setOpenLogoutSetting(false)}
		/>	
		
	</div>;
}

export default SettingPage;
