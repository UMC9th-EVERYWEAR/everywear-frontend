import MusinsaLogo from '@/public/svgs/LogoImages/MusinsaLogo.svg';
import ZigzagLogo from '@/public/svgs/LogoImages/ZigzagLogo.png';
import Logo29cm from '@/public/svgs/LogoImages/29cmLogo.svg';
import WLogo from '@/public/svgs/LogoImages/WLogo.svg';import  { MALL_LINKS } from '@/src/constants/link'
import { cn } from '@/src/utils/cn';

interface PartnerMallSectionProps {
isHome?: boolean
}
const PartnerMallSection = ({ isHome } : PartnerMallSectionProps) => {
	return(
		<section
			className={cn('flex gap-2 px-4 py-4',
				isHome ? 'bg-white overflow-x-auto no-scrollbar' : '',

			)}
		>
			{[
				{ url: MALL_LINKS.MUSINSA.url, src: MusinsaLogo, alt: '무신사', bg: 'bg-black' },
				{ url: MALL_LINKS.ZIGZAG.url, src: ZigzagLogo, alt: '지그재그', bg: 'bg-[#E976DE]' },
				{ url: MALL_LINKS.CM.url, src: Logo29cm, alt: '29CM', bg: 'bg-black' },
				{ url: MALL_LINKS.WCONCEPT.url, src: WLogo, alt: 'W컨셉', bg: 'bg-white border border-[var(--color-neutral-100)]' },
			].map((mall, idx) => (
				<a
					key={idx}
					href={mall.url}
					target="_blank"
					rel="noreferrer"
					className={cn(`${mall.bg} rounded-[6px] flex items-center justify-center overflow-hidden shrink-0`,
						isHome ? ' w-[75px] h-[75px]' : 'w-15 h-15 rounded-full',
					)}
				>
					<img
						src={mall.src}
						alt={mall.alt}
						className="w-full h-full object-contain p-1"
					/>
				</a>
			))}
		</section>

	)
}
export default PartnerMallSection
