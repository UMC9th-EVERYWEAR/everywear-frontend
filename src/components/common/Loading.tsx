// 로딩 시 보여줄거임
import { SVG_ICON_DATA, type SvgIconFn } from '@/src/assets/icons';
import { useRotatingIcon } from '@/src/hooks/domain/products/useRotatingIcon';




const LOADING_ICONS: SvgIconFn[] = [
	SVG_ICON_DATA.Top,
	SVG_ICON_DATA.Bottom,
	SVG_ICON_DATA.Outer,
	SVG_ICON_DATA.Dress,
];


const Loading = () => {

	const RotatingIcon = useRotatingIcon(
		LOADING_ICONS,
		2000,     // 2초
		true,
	);
  
	return(
		<div 
			className="min-h-screen flex items-center justify-center"
		>
			<div className="scale-800 animate-clothes-motion transition-opacity duration-300 mb-20">
				{RotatingIcon(false)}
			</div>
		</div>
	)
}

export default Loading
