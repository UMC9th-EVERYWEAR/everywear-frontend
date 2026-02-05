// 로딩 시 보여줄거임
import { ICON_DATA } from '../../assets/icons/SvgIndex
import { useRotatingIcon } from '@/src/hooks/domain/products/useRotatingIcon';


const LOADING_ICONS = [
	ICON_DATA.TopIcon,
	ICON_DATA.BottomIcon,
	ICON_DATA.OuterIcon,
	ICON_DATA.DressIcon,
];


const LoadingPage = () => {

	const RotatingIcon = useRotatingIcon(
		LOADING_ICONS,
		2000,     // 2초
		true,
	);
	
	return(
		<div 
			className="min-h-screen flex items-center justify-center"
		>
			<div className="scale-900 animate-clothes-motion transition-opacity duration-300">
				{RotatingIcon(true)}
			</div>
		</div>
	)
}

export default LoadingPage
