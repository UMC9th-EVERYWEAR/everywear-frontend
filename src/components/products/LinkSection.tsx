import Button from '@/src/components/common/Button';
import { LoadingSpinner } from '../ai-fitting/LoadingSpinner';

interface LinkSectionProps {
  link: string;
  loading?: boolean;
  isValidLink: boolean;
  onChangeLink: (value: string) => void;
  onSubmit: () => void;
}

const LinkSection = ({
	link,
	loading,
	isValidLink,
	onChangeLink,
	onSubmit,
}: LinkSectionProps) => {
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
				<span className="absolute top-13 text-regular-12 text-primary-600 self-start">
					올바른 상품 링크를 입력해주세요.
				</span>
			)}

			{
				!loading && 
				<Button
					disabled={!isValidLink}
					onClick={onSubmit}
				>
					추가 완료
				</Button>
			}

			{/*loading 두 개 버전*/}
			{/* 
			{
				loading && 
				<Button
					disabled={!isValidLink}
					onClick={onSubmit}
				>
					<LoadingSpinner size={7}/>			
				</Button>
			} */}

			{/*loading modal*/}
			{
				loading && 
				<div
					className="fixed inset-0 z-100 flex flex-col gap-5 items-center justify-center bg-black/50"
				>				
					<LoadingSpinner size={20} />
					<div className='text-bold-20'>
						상품을 추가하고있어요!
					</div>
				</div>
			}
		</div>
	);
};

export default LinkSection;


// TODO: 모달은 api 연동 후에 제작
