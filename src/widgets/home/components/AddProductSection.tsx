import Button from '@/src/shared/components/common/Button';

const AddProductSection = () => {
	return (
		<section className="flex flex-col px-4 mt-4 gap-4">
			<span className="self-center text-center text-[#8D98FF] text-[10px] font-[400] leading-[150%] tracking-[-0.3px] cursor-pointer">
				유명 브랜드 가상 피팅 가이드
			</span>

			<div className="w-full">
				<Button
					variant="filled"
					size="xl"
				>
					상품 추가하기
				</Button>
			</div>
		</section>
	);
};

export default AddProductSection;
