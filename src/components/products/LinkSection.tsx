import Button from '@/src/components/common/Button';
import { useRotatingIcon } from '@/src/hooks/domain/products/useRotatingIcon';
import { Icons } from '@/src/assets/icons/components/Icons';
import React from 'react';

interface LinkSectionProps {
  link: string;
  loading?: boolean;
  isValidLink: boolean;
  onChangeLink: (value: string) => void;
  onSubmit: () => void;
}

type SvgIconComponent = React.ComponentType<
	React.SVGProps<SVGSVGElement>
>;


const LOADING_ICONS: SvgIconComponent[] = [
	Icons.Top,
	Icons.Bottom,
	Icons.Outer,
	Icons.OnePiece,
];



const AI_FITTING_PROGRESS_MESSAGES = [
	'상품을 옷장에 담고 있어요',
	'곧 이 상품을 직접 입어보고 분석할 수 있어요!',
	'의상 정보를 하나씩 분석하고 있어요',
	'이제 모델 핏 말고 진짜 내 핏으로 확인하세요!',
	'이 상품, 내 사진에 입혀보면 어떤 느낌일까요? ',
];



const LinkSection = ({
	link,
	loading,
	isValidLink,
	onChangeLink,
	onSubmit,
}: LinkSectionProps) => {

	const index = useRotatingIcon(
		LOADING_ICONS,
		3000,    
		loading ?? false,  // 로딩 중일 때만
	);

	const Icon = LOADING_ICONS[index];

	const messageIndex = useRotatingIcon(
		AI_FITTING_PROGRESS_MESSAGES,
		3000,
		true,
	)
	const RotatingMessage = AI_FITTING_PROGRESS_MESSAGES[messageIndex]
	

	return (
		<div className="relative mt-6 flex w-75 flex-col gap-6 items-center">
			<input
				value={link}
				onChange={(e) => onChangeLink(e.target.value)}
				placeholder="링크를 넣어주세요"
				className="w-full border-[1.5px] rounded-lg border-neutral-900 p-3 placeholder:text-neutral-500
                   focus:outline-none focus:ring-1 focus:ring-primary-300"
			/>

			{/* 에러 메시지 */}
			{link && !isValidLink && (
				<span className="absolute top-13.5 text-regular-12 text-primary-600 self-start">
					올바른 상품 링크를 입력해주세요.
				</span>
			)}

			{
				!loading && 
				<Button
					disabled={!isValidLink}
					onClick={onSubmit}
					size='md'
				>
					추가 완료
				</Button>
			}

			{
				loading && 
				<div
					className="fixed inset-0 z-100 flex flex-col gap-20 items-center justify-center bg-black/50"
				>				
					<div className="absolute scale-900 top-1/3 left-1/2 -translate-x-1/2 animate-clothes-motion  py-1">
						<Icon className="w-5 h-10 text-white" />
					</div>
					<div 
						key={RotatingMessage}
						className='text-bold-20 text-white animate-view-out'
					>
						{RotatingMessage}			
					</div>
				</div>
			}
		</div>
	);
};

export default LinkSection;


// TODO: 모달은 api 연동 후에 제작
