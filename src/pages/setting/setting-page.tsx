import { UserResponseDtoSocialTypeEnum } from '@/src/apis/generated';
import AccountSection from '@/src/components/setting/setting/AccountSection';
import FooterActions from '@/src/components/setting/setting/FooterActions';
import LogoutModal from '@/src/components/setting/setting/LogooutModal';
import SupportSection from '@/src/components/setting/setting/SupportSection';
import  { PATH } from '@/src/constants/path';
import { useMe } from '@/src/hooks/service/auth/useMe';
import { useState } from 'react';
import { useNavigate } from 'react-router';
const SettingPage = () => {	
	const [openLoginSetting, setOpenLoginSetting] = useState(false);
	const [openLogoutSetting, setOpenLogoutSetting] = useState(false);
	

	const toggleLoginSetting = () =>
		setOpenLoginSetting((prev) => !prev);


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


	const meData = useMe();
	const socialLogin =
  meData.data?.socialType ?? UserResponseDtoSocialTypeEnum.KAKAO;
	
	return <div className="mt-5 mx-4 w-[calc(100%-32px)]">
		<div className='text-neutral-900  mb-7 '>
			<div className=' flex flex-col gap-5' >
				<AccountSection
					openLoginSetting={openLoginSetting}
					toggleLoginSetting={toggleLoginSetting}
					socialType={socialLogin ?? 'KAKAO'}
					onChangePhoto={goChangePhoto}
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
