import React from "react";
import {ICON_DATA} from "../../assets/SvgIndex";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const HomeIcon = ({ size = 16, height = 15.75, ...props }: IconProps) => (
  ICON_DATA.HomeIcon(props) 
);

export const ProductIcon = ({ size = 18, height = 16, ...props }: IconProps) => (
  ICON_DATA.ProductIcon(props) 
);

export const FittingIcon = ({ size = 19.998, height = 16, ...props }: IconProps) => (
  ICON_DATA.FittingIcon(props)
);

export const ClosetIcon = ({ size = 13.412, height = 15.85, ...props }: IconProps) => (
  ICON_DATA.ClosetIcon(props)
);
