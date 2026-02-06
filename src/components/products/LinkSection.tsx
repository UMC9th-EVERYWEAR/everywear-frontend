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


const LinkSection = ({
	link,
	loading,
	isValidLink,
	onChangeLink,
	onSubmit,
}: LinkSectionProps) => {
	const RotatingIcon = useRotatingIcon(
		LOADING_ICONS,
		2000,     // 2초
		loading ?? false,  // 로딩 중일 때만
	);

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
					<div className="scale-900 animate-clothes-motion transition-opacity duration-300">
						{RotatingIcon(true)}
					</div>
					<div className='text-bold-20 flex text-white'>
						상품을 옷장에 담고 있어요
					</div>
				</div>
			}
		</div>
	);
};

export default LinkSection;


// TODO: 모달은 api 연동 후에 제작
