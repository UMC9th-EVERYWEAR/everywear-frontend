import { Icons } from '@/src/assets/icons/components/Icons';
import { useRotatingIcon } from '@/src/hooks/domain/products/useRotatingIcon';
import React from 'react';


type SvgIconComponent = React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;


const LOADING_ICONS: SvgIconComponent[] = [
	Icons.Top,
	Icons.Bottom,
	Icons.Outer,
	Icons.OnePiece,
];


const Loading = () => {

	const index = useRotatingIcon(
		LOADING_ICONS,
		2000,   
		true,
	);

	const Icon = LOADING_ICONS[index];

  
	return(
		<div 
			className="min-h-screen flex flex-col items-center justify-center"
		>
			<div className="absolute scale-800 top-1/3 left-1/2 -translate-x-1/2   animate-clothes-motion mb-20">
				<Icon className="w-5 h-10 text-primary-600" />
			</div>
		</div>
	)
}

export default Loading
