import { type SvgIconKey, SVG_ICON_DATA } from './SvgIcon';

interface IconSvgProps {
  name: SvgIconKey;
  active?: boolean;
  size?: number;
  className?: string;
}

export const IconSvg = ({
	name,
	active = false,
	size = 24,
	className,
}: IconSvgProps) => {
	return (
		<span
			className={className}
			style={{ width: size, height: size }}
			aria-hidden
		>
			{SVG_ICON_DATA[name](active)}
		</span>
	);
};