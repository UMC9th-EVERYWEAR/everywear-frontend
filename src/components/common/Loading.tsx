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
			className="min-h-screen flex flex-col items-center justify-center"
		>
			<div className="absolute scale-800 top-1/3 left-1/2 -translate-x-1/2   animate-clothes-motion mb-20">
				{RotatingIcon(false)}
			</div>
		</div>
	)
}

export default Loading
