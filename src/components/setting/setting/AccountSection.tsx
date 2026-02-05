import { SETTING_IMAGES } from '@/src/constants/images';
import { ArrowRightIcon } from './ArrowRightIcon.';
import ToggleBtn from './ToggleBtn';
import type { UserResponseSocialTypeEnum } from '@/src/apis/generated';


interface Props {
  openLoginSetting: boolean;
  toggleLoginSetting: () => void;
	socialType: UserResponseSocialTypeEnum;
  onChangePhoto: () => void;
}

const AccountSection = ({
	openLoginSetting,
	toggleLoginSetting,
	socialType,
	onChangePhoto,
}: Props) => {
	return (

		<div>
			<div className="border-b py-1 border-neutral-900 text-medium-16">
				회원정보
			</div>

			<button
				onClick={onChangePhoto}
				className="py-2 w-full flex justify-between border-b-[0.5px] border-neutral-300"
			>
				<span className="text-regular-14 flex items-center">
					기본 사진 변경
				</span>
				<img
					src={SETTING_IMAGES.ARROW_RIGHT}
					alt="arrow right"
					className='cursor-pointer'
				/>
			</button>

			<button
				onClick={toggleLoginSetting}
				className="py-2 w-full flex justify-between border-b-[0.5px] border-neutral-300"
			>
				<span className="text-regular-14 flex items-center">
					간편 로그인 설정
				</span>
				<ArrowRightIcon rotated={openLoginSetting} />
			</button>

			<div
				className={` flex flex-col gap-2 py-2
						overflow-hidden
						transition-all duration-300 ease-in-out
						${openLoginSetting
					? 'max-h-40 opacity-100 translate-y-0'
					: 'max-h-0 opacity-0 -translate-y-1'}
					`}
			>
				{(['KAKAO', 'GOOGLE'] as const).map((provider) => (
					<div
						key={provider}
						className="flex justify-between"
					>
						<button className="text-regular-14 text-left">
						
							{provider === 'KAKAO'
								? '카카오 로그인 연동'
								: '구글 로그인 연동'}
						</button>
						<ToggleBtn
							checked={socialType === provider}
						/>
					</div>
				))}

				<p className="text-regular-10 text-neutral-400">
					* SNS 계정을 연결하시면 간편하게 로그인할 수 있습니다.
				</p>
			</div>
		</div>

	);
};

export default AccountSection;
