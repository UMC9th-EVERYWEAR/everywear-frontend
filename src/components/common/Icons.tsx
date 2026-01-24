import React from 'react';
import { ICON_DATA } from '../../../public/Svgs/Icons/SvgIndex';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const HomeIcon = ({ size = 16, height = 15.75, ...props }: IconProps) => (
	<ICON_DATA.HomeIcon
		width={size}
		height={height}
		{...props}
	/>
);

export const ProductIcon = ({ size = 18, height = 16, ...props }: IconProps) => (
	<ICON_DATA.ProductIcon
		width={size}
		height={height}
		{...props}
	/>
);

export const FittingIcon = ({ size = 19.998, height = 16, ...props }: IconProps) => (
	<ICON_DATA.FittingIcon
		width={size}
		height={height}
		{...props}
	/>
);

export const ClosetIcon = ({ size = 13.412, height = 15.85, ...props }: IconProps) => (
	<ICON_DATA.ClosetIcon
		width={size}
		height={height}
		{...props}
	/>
);
