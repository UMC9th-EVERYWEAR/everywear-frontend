import Button from '@/src/components/common/Button';
import TermsCheckBox, { type TermsCheckedState, type TermType } from '@/src/components/login/TermsCheckBox'
import { LOGO_IMAGES } from '@/src/constants/images';
import { PATH } from '@/src/constants/path';
import { TERMS_CONFIG } from '@/src/constants/terms';
import { useToggleAgree } from '@/src/hooks/service/user/useToggle';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';


const LoginTermsPage = () => {
	const navigate = useNavigate();

	const initialState = Object.keys(TERMS_CONFIG).reduce((acc, key) => ({ ...acc, [key] : false }),
	{} as TermsCheckedState,
	)

	const [checked, setChecked] = useState<TermsCheckedState>(initialState);


	// 전체 동의 여부 (계산값)
	const isAllChecked = Object.values(checked).every(Boolean);

	// 전체 동의 토글
	const toggleAll = () => {
		const next = !isAllChecked;
		const updated = Object.keys(TERMS_CONFIG).reduce((acc, key)=> ({ ...acc, [key] : next }),
		{} as TermsCheckedState)
		setChecked(updated)
	};

	const toggleOne = (key: TermType) => {
		setChecked((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};
	const { mutate: toggleAgree, isPending: togglePending , isError } = useToggleAgree();

	const handleLogin = () => {
		if(!isAllChecked) return;
		toggleAgree(undefined, {
			onSuccess: () => navigate(PATH.ONBOARDING.ROOT),
		})
	};

	useEffect(() => {
		if (isError) {
			navigate(PATH.LOGIN.ROOT, { replace: true });
		}
	}, [isError, navigate]);

	return(
		<div className='w-full flex flex-col items-center pt-32 gap-13'>
			<div className='flex flex-col items-center w-65'>


				<img
					src={LOGO_IMAGES.EVERYWEAR}
					alt='logo'
					className='w-full px-6 mb-5'
				/>
				<p className='text-center text-neutral-500'>회원가입을 위한 약관에 동의해주세요.</p>
			</div>

			<div className="flex flex-col gap-3 w-full px-6 max-w-80">
				<TermsCheckBox
					checked={isAllChecked}
					label="서비스 약관 전체 동의"
					onClick={toggleAll}
				/>

				<div className="h-px w-full  bg-neutral-200" />
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
				${isAllChecked ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
			>
				<Button
					disabled={!isAllChecked || togglePending}
					onClick={handleLogin}
				>로그인하기</Button>
			</div>

		</div>
	);
};

export default LoginTermsPage;
