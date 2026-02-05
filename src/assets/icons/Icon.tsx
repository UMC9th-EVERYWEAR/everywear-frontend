import { type IconKey, ICON_DATA } from './SvgIndex';


type IconProps = {
  name: IconKey;
  active?: boolean;
  size?: number;
  className?: string;
};

export const Icon = ({
	name,
	active = false,
	size = 24,
	className,
}: IconProps) => {
	return (
		<span
			className={className}
			style={{ width: size, height: size }}
			aria-hidden
		>
			{ICON_DATA[name](active)}
		</span>
	);
};
