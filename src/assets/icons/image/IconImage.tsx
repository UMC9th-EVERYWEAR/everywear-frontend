import { type ImageIconKey, IMAGE_ICON_DATA } from "./ImageIcons";

interface IconImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: ImageIconKey;
  active?: boolean;
  size?: number;
}

export const IconImage = ({
  name,
  active = false,
  size = 24,
  ...props
}: IconImageProps) => (
  <img
    src={IMAGE_ICON_DATA[name](active)}
    width={size}
    height={size}
    alt={name}
    {...props}
  />
);
