import arrowRight from '@/public/svgs/setting/arrow-right.svg';

interface Props {
  onInquiry: () => void;
}

const SupportSection = ({ onInquiry }: Props) => {
	return (
		<div className="mb-7">
			<div className="border-b py-1 border-neutral-900 text-medium-16">
				지원
			</div>

			<div className="py-2 flex justify-between border-b-[0.5px] border-neutral-300">
				<span className="text-regular-14">서비스 이용약관</span>
				<img
					src={arrowRight}
					alt="arrow right"
					className='cursor-pointer'

				/>
			</div>

			<div className="py-2 flex justify-between border-b-[0.5px] border-neutral-300">
				<span className="text-regular-14">개인정보 처리방침</span>
				<img
					src={arrowRight}
					alt="arrow right"
					className='cursor-pointer'

				/>
			</div>

			<button
				onClick={onInquiry}
				className="py-2 w-full flex justify-between border-b-[0.5px] border-neutral-300"
			>
				<span className="text-regular-14">1:1 문의하기</span>
				<img
					src={arrowRight}
					alt="arrow right"
					className='cursor-pointer'

				/>
			</button>
		</div>
	);
};

export default SupportSection;
