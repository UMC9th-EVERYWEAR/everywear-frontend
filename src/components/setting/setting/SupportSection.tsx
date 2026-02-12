import { Icons } from '@/src/assets/icons/components/Icons';
import { cn } from '@/src/utils/cn';
import { TERMS_CONFIG } from '@/src/constants/terms';

interface Props {
  onInquiry: () => void;
}



const SupportSection = ({ onInquiry }: Props) => {
	return (
		<div className="mb-9">
			<div className="border-b py-1 border-neutral-900 text-medium-16">
				지원
			</div>

			<button 
				onClick={() => window.open(TERMS_CONFIG.SERVICE.url, '_blank', 'noopener,noreferrer')}
				className="w-full py-2 flex justify-between border-b-[0.5px] border-neutral-300 cursor-pointer"
			>
				<span className="text-regular-14">서비스 이용약관</span>
				<Icons.Arrow 
					size={25}
					className={cn(
						'cursor-pointer transition-transform duration-200 text-neutral-300',
					)}
				/>
			</button>

			<button
				onClick={() => window.open(TERMS_CONFIG.PRIVACY.url, '_blank', 'noopener,noreferrer')}
				className="w-full py-2 flex justify-between border-b-[0.5px] border-neutral-300 cursor-pointer"
			>
				<span className="text-regular-14">개인정보 처리방침</span>
				<Icons.Arrow 
					size={25}
					className={cn(
						'cursor-pointer transition-transform duration-200 text-neutral-300',
					)}
				/>
			</button>

			<button
				onClick={onInquiry}
				className="py-2 w-full flex justify-between border-b-[0.5px] border-neutral-300 cursor-pointer"
			>
				<span className="text-regular-14">1:1 문의하기</span>
				<Icons.Arrow 
					size={25}
					className={cn(
						'cursor-pointer transition-transform duration-200 text-neutral-300',
					)}
				/>
			</button>
		</div>
	);
};

export default SupportSection;
