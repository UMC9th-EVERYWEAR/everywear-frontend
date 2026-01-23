import MusinsaLogo from '@/public/svgs/LogoImages/MusinsaLogo.svg';
import ZigzagLogo from '@/public/svgs/LogoImages/ZigzagLogo.png';
import Logo29cm from '@/public/svgs/LogoImages/29cmLogo.svg';
import WLogo from '@/public/svgs/LogoImages/WLogo.svg';

const PartnerMallSection = () => {
	return (
		<>
			<section className="px-4 pt-6 pb-2">
				<h2 className="text-[#000000] text-[20px] font-[500] leading-normal mt-1">
					파트너 쇼핑몰
				</h2>
				<p className="text-[#596373] text-[12px] font-[400] leading-[150%] tracking-[-0.36px]">
					유명 브랜드 가상 피팅가이드를 확인해보세요
				</p>
			</section>

			<section className="flex justify-between px-6 py-4 bg-white">
				<div className="w-[75px] h-[75px] bg-black rounded-[6px] flex items-center justify-center overflow-hidden shrink-0">
					<img
						src={MusinsaLogo}
						alt="무신사"
						className="w-full h-full object-contain"
					/>
				</div>

				<div className="w-[75px] h-[75px] bg-[#E592FF] rounded-[6px] flex items-center justify-center overflow-hidden shrink-0">
					<img
						src={ZigzagLogo}
						alt="지그재그"
						className="w-full h-full object-contain"
					/>
				</div>

				<div className="w-[75px] h-[75px] bg-black rounded-[6px] flex items-center justify-center overflow-hidden shrink-0">
					<img
						src={Logo29cm}
						alt="29CM"
						className="w-full h-full object-contain p-1"
					/>
				</div>

				<div className="w-[75px] h-[75px] bg-white border border-[#F1F1F1] rounded-[6px] flex items-center justify-center overflow-hidden shrink-0">
					<img
						src={WLogo}
						alt="W컨셉"
						className="w-full h-full object-contain"
					/>
				</div>
			</section>
		</>
	);
};

export default PartnerMallSection;
