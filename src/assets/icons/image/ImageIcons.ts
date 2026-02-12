import { LOGO_IMAGES } from '@/src/constants/images';

export const IMAGE_ICON_DATA = {
	Home: (active: boolean) =>
		active ? LOGO_IMAGES.HOME_ON : LOGO_IMAGES.HOME_OFF,

	Product: (active: boolean) =>
		active ? LOGO_IMAGES.CLOSET_ON : LOGO_IMAGES.CLOSET_OFF,

	Fitting: (active: boolean) =>
		active ? LOGO_IMAGES.HANGER_ON : LOGO_IMAGES.HANGER_OFF,

	Closet: (active: boolean) =>
		active ? LOGO_IMAGES.CLOSET_ON : LOGO_IMAGES.CLOTHES_OFF,
} as const;

export type ImageIconKey = keyof typeof IMAGE_ICON_DATA;
