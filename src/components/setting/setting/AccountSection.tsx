import arrowRight from '@/public/svgs/arrow-right.svg';
import { ArrowRightIcon } from './ArrowRightIcon.';
import ToggleBtn from './ToggleBtn';


interface Props {
  openLoginSetting: boolean;
  toggleLoginSetting: () => void;
  linkedSocialAccounts: {
    naver: boolean;
    kakao: boolean;
    apple: boolean;
  };
  toggleSocialLink: (provider: 'naver' | 'kakao' | 'apple') => void;
  onChangePhoto: () => void;
}

const AccountSection = ({
	openLoginSetting,
	toggleLoginSetting,
	linkedSocialAccounts,
	toggleSocialLink,
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
					src={arrowRight}
					alt="arrow right"
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

			{openLoginSetting && (
				<div className="flex flex-col gap-2 py-2">
					{(['naver', 'kakao', 'apple'] as const).map((provider) => (
						<div
							key={provider}
							className="flex justify-between"
						>
							<button className="text-regular-14 text-left">
								{provider === 'naver'
									? '네이버 로그인 연동'
									: provider === 'kakao'
										? '카카오 로그인 연동'
										: '애플 로그인 연동'}
							</button>
							<ToggleBtn
								checked={linkedSocialAccounts[provider]}
								onChange={() => toggleSocialLink(provider)}
							/>
						</div>
					))}

					<p className="text-regular-10 text-neutral-400">
						* SNS 계정을 연결하시면 간편하게 로그인할 수 있습니다.
					</p>
				</div>
			)}
		</div>

	);
};

export default AccountSection;
