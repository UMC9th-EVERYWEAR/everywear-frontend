import  { SETTING_IMAGES } from '@/src/constants/images';
import { TERMS_CONFIG } from '@/src/pages/login/login-terms-page';

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
				<img
					src={SETTING_IMAGES.ARROW_RIGHT}
					alt="arrow right"

				/>
			</button>

			<button
				onClick={() => window.open(TERMS_CONFIG.PRIVACY.url, '_blank', 'noopener,noreferrer')}
				className="w-full py-2 flex justify-between border-b-[0.5px] border-neutral-300 cursor-pointer"
			>
				<span className="text-regular-14">개인정보 처리방침</span>
				<img
					src={SETTING_IMAGES.ARROW_RIGHT}
					alt="arrow right"
					className='cursor-pointer'

				/>
			</button>

			<button
				onClick={onInquiry}
				className="py-2 w-full flex justify-between border-b-[0.5px] border-neutral-300 cursor-pointer"
			>
				<span className="text-regular-14">1:1 문의하기</span>
				<img
					src={SETTING_IMAGES.ARROW_RIGHT}
					alt="arrow right"
				/>
			</button>
		</div>
	);
};

export default SupportSection;
