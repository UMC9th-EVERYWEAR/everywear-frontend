import Button from '@/src/components/common/Button';
import { useRotatingIcon } from '@/src/hooks/domain/products/useRotatingIcon';
import { SVG_ICON_DATA, type SvgIconFn } from '@/src/assets/icons';

interface LinkSectionProps {
  link: string;
  loading?: boolean;
  isValidLink: boolean;
  onChangeLink: (value: string) => void;
  onSubmit: () => void;
}

const LOADING_ICONS: SvgIconFn[] = [
	SVG_ICON_DATA.Top,
	SVG_ICON_DATA.Bottom,
	SVG_ICON_DATA.Outer,
	SVG_ICON_DATA.Dress,
];

const AI_FITTING_PROGRESS_MESSAGES = [
	'상품을 옷장에 담고 있어요',
	'오늘은 어떤 무드의 옷이 좋으세요?',
	'의상 정보를 하나씩 분석하고 있어요',
	'이 스타일을 기준으로 더 보여드릴까요?',
	'의상을 꼼꼼히 분석하고 있어요. 조금만 기다려 주세요',
];



const LinkSection = ({
	link,
	loading,
	isValidLink,
	onChangeLink,
	onSubmit,
}: LinkSectionProps) => {
	const RotatingIcon = useRotatingIcon(
		LOADING_ICONS,
		3000,    
		loading ?? false,  // 로딩 중일 때만
	);

	const RotatingMessage = useRotatingIcon(
		AI_FITTING_PROGRESS_MESSAGES,
		3000,
		true,
	)
	

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
				!loading && 
				<div
					className="fixed inset-0 z-100 flex flex-col gap-20 items-center justify-center bg-black/50"
				>				
					<div className="absolute scale-900 top-1/3 left-1/2 -translate-x-1/2 animate-clothes-motion pt-1">
						{RotatingIcon(true)}
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
