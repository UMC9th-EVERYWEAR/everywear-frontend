import accuracy from '@/public/svgs/onboarding/accuracy-icon.svg'
import security from '@/public/svgs/onboarding/lock-icon.svg'
import speed from '@/public/svgs/onboarding/cart-icon.svg'


export type FeatureKey = 'ACCURACY' | 'SECURITY' | 'SPEED';


interface OnboardingNoticeProps {
feature: FeatureKey
}

const FEATURE_CONFIG: Record<
  FeatureKey,
  {
    title: string;
    description: string;
    icon: string;
  }
> = {
	ACCURACY: {
		title: '정확한 AI 피팅',
		description: '정면 전신 사진으로 더 정확한 피팅 결과를 제공합니다.',
		icon: accuracy,
	},
	SECURITY: {
		title: '안전한 보관',
		description: '사진은 안전하게 암호화되어 보관되며, 본인만 확인 가능합니다.',
		icon: security,
	},
	SPEED: {
		title: '빠른 피팅',
		description: '한 번 등록으로 모든 상품을 빠르게 가상으로 착용해보세요.',
		icon: speed,
	},
};

const OnboardingNotice = ({ feature }: OnboardingNoticeProps) => {
	const { title, description, icon } = FEATURE_CONFIG[feature];

	return (
		<div className="flex gap-4 rounded-xl bg-white p-4 items-center max-w-109">

			<div className='w-11 h-11 min-w-11 rounded-full bg-neutral-200 flex justify-center items-center'>
				<img
					src={icon}
					alt={title}
					className="h-6 w-6"
				/>
			</div>

			<div>
				<h3 className="text-bold-18 text-primary-600">{title}</h3>
				<p className="mt-1 text-regular-14 text-neutral-700">{description}</p>
			</div>
		</div>
	);
};

export default OnboardingNotice;
