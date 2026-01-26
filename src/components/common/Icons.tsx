import  { ICON_DATA } from '@/public/Svgs/Icons/SvgIndex';
import React from 'react';


interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  height?: number;
  active?: boolean; // 활성화 여부
  className?: string;
}

export const HomeIcon = ({ size = 24, height = 24, active = false, ...props }: IconProps) => (
  <img 
    src={ICON_DATA.HomeIcon(active)} 
    width={size} 
    height={height} 
    alt="홈 아이콘"
    {...props} 
  />
);
export const ProductIcon = ({ size = 24, height = 24, active = false, ...props }: IconProps) => (
	<img 
    src={ICON_DATA.ProductIcon(active)} 
    width={size} 
    height={height} 
    alt="홈 아이콘"
    {...props} 
  />
);

export const FittingIcon = ({ size = 24, height = 24, active = false,...props }: IconProps) => (
	<img 
    src={ICON_DATA.FittingIcon(active)} 
    width={size} 
    height={height} 
    alt="홈 아이콘"
    {...props} 
  />
);

export const ClosetIcon = ({ size = 24, height = 24, active = false,...props }: IconProps) => (
	<img 
    src={ICON_DATA.ClosetIcon(active)} 
    width={size} 
    height={height} 
    alt=" 아이콘"
    {...props} 
  />
);
