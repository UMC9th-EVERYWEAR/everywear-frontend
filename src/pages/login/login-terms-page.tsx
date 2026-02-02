import logo from '@/public/svgs/LogoImages/Everywear.svg'
import Button from '@/src/components/common/Button';
import TermsCheckBox, { type TermsCheckedState, type TermType } from '@/src/components/login/TermsCheckBox'
import  { TERMS_LINK } from '@/src/constants/link';
import { PATH } from '@/src/constants/path';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const TERMS_CONFIG: Record<TermType, { label: string; url: string }> = {
	SERVICE: { label: '서비스 이용약관 동의', url: TERMS_LINK.SERVICE_TERMS.url },
	PRIVACY: { label: '개인정보 수집 및 이용 동의', url: TERMS_LINK.PRIVACY.url },
	PHOTO: { label: '사진 정보 피팅 이용 동의', url: TERMS_LINK.PHOTO.url },
	PRODUCT: { label: '상품 정보 수집 및 분석 동의', url: TERMS_LINK.PRODUCT.url },
};

const LoginTermsPage = () => {
	const navigate = useNavigate();

	const [checked, setChecked] = useState<TermsCheckedState>({
		SERVICE: false,
		PRIVACY: false,
		PHOTO: false,
		PRODUCT: false,
	});


	// 전체 동의 여부 (계산값)
	const isAllChecked = Object.values(checked).every(Boolean);

	// 전체 동의 토글
	const toggleAll = () => {
		const next = !isAllChecked;
		setChecked({
			SERVICE: next,
			PRIVACY: next,
			PHOTO: next,
			PRODUCT: next,
		});
	};

	// 개별 토글
	const toggleOne = (key: TermType) => {
		setChecked((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};


	return(
		<div className='w-full flex flex-col items-center pt-32 gap-13'>
			<div className='flex flex-col items-center w-65'>


				<img
					src={logo}
					alt='logo'
					className='w-full px-6 mb-5'
				/>
				<p className='text-center text-neutral-500'>회원가입을 위한 약관에 동의해주세요.</p>
			</div>

			<div className="flex flex-col gap-3 w-full px-6 max-w-80">
				{/* 전체 동의 */}
				<TermsCheckBox
					checked={isAllChecked}
					label="서비스 약관 전체 동의"
					onClick={toggleAll}
				/>

				<div className="h-px w-full  bg-neutral-200" />

				{/* 개별 약관 */}
				{(Object.keys(TERMS_CONFIG) as TermType[]).map((key) => (
					<TermsCheckBox
						key={key}
						checked={checked[key]}
						label={TERMS_CONFIG[key].label}
						required
						link={TERMS_CONFIG[key].url}
						onClick={() => toggleOne(key)}
					/>
				))}
			</div>
			<div
				className={`
    max-w-87 w-full
    transition-all duration-300 ease-out
    ${isAllChecked ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
  `}
			>
				<Button
					disabled={!isAllChecked}
					onClick={()=>navigate(PATH.ONBOARDING.ROOT)}
				>로그인하기</Button>
			</div>

		</div>
	);
};

export default LoginTermsPage;
