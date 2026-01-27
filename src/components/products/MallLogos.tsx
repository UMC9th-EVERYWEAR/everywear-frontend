import MusinsaLogo from '@/public/svgs/LogoImages/MusinsaLogo.svg';
import ZigzagLogo from '@/public/svgs/LogoImages/ZigzagLogo.png';
import Logo29cm from '@/public/svgs/LogoImages/29cmLogo.svg';
import WLogo from '@/public/svgs/LogoImages/WLogo.svg';

const MallLogosSection = () => {
	return(
		<div className="max-w-md bg-neutral-50 py-7 px-8 w-full flex flex-col  gap-5 rounded-lg">

			<div className='flex justify-center gap-3'>

				<div className="w-15 h-15 rounded-full overflow-hidden bg-black flex  items-center justify-center">
					<img
						src={MusinsaLogo}
						alt="무신사"
						className="w-full h-full object-cover"
					/>
				</div>

				<div className="w-15 h-15 rounded-full overflow-hidden bg-black flex items-center justify-center">
					<img
						src={ZigzagLogo}
						alt="지그재그"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="w-15 h-15 rounded-full overflow-hidden bg-black flex items-center justify-center">
					<img
						src={Logo29cm}
						alt="29CM"
						className="w-full h-full object-cover pb-1.5 pr-1"
					/> 
				</div>
				<div className="w-15 h-15 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-8">
					<img
						src={WLogo}
						alt="W컨셉"
						className="w-full h-full object-contain"
					/>
					
				</div>
			</div>
      	
			<div>
				<span className="text-start text-primary-300 text-regular-10 cursor-pointer hover:opacity-75">
					유명 브랜드 가상 피팅 가이드 &gt;
				</span>
			</div>  
		</div>

	)
};
export default MallLogosSection
