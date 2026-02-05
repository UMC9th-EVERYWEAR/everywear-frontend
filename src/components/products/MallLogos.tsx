import { LOGO_IMAGES } from "@/src/constants/images";


const mallLogos = [
	{ src: LOGO_IMAGES.MUSINSA, alt: '무신사', imgClassName: 'w-full h-full object-cover', wrapperClassName: 'bg-black' },
	{ src: LOGO_IMAGES.ZIGZAG, alt: '지그재그', imgClassName: 'w-full h-full object-cover', wrapperClassName: 'bg-black' },
	{ src: LOGO_IMAGES.LOGO_29CM, alt: '29CM', imgClassName: 'w-full h-full object-cover pb-1.5 pr-1', wrapperClassName: 'bg-black' },
	{ src: LOGO_IMAGES.W_LOGO, alt: 'W컨셉', imgClassName: 'w-full h-full object-contain', wrapperClassName: 'bg-white shadow-8' },
];


const MallLogosSection = () => {
	return(

		<div className="w-85 bg-neutral-50 py-7 px-8.5 flex flex-col  gap-5 rounded-lg">
			<div className='flex justify-center gap-3'>
				{mallLogos.map(({ src, alt, imgClassName, wrapperClassName }) => (
					<div
						key={alt}
						className={`w-15 h-15 rounded-full overflow-hidden flex items-center justify-center ${wrapperClassName}`}
					>
						<img
							src={src}
							alt={alt}
							className={imgClassName}
						/>
					</div>
				))}
			</div>
      	
			<div>
				<span className="text-start pl-3 text-primary-300 text-regular-10 cursor-pointer hover:opacity-75">
					유명 브랜드 가상 피팅 가이드 &gt;
				</span>
			</div>  
		</div>

	)
};
export default MallLogosSection
