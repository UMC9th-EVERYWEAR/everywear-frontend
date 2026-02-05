export const IMAGE_ICON_DATA = {
  Home: (active: boolean) =>
    active ? '/svgs/LogoImages/home-on.svg' : '/svgs/LogoImages/home-off.svg',

  Product: (active: boolean) =>
    active ? '/svgs/LogoImages/clothes-on.svg' : '/svgs/LogoImages/clothes-off.svg',

  Fitting: (active: boolean) =>
    active ? '/svgs/LogoImages/hanger-on.svg' : '/svgs/LogoImages/hanger-off.svg',

  Closet: (active: boolean) =>
    active ? '/svgs/LogoImages/closet-on.svg' : '/svgs/LogoImages/closet-off.svg',
} as const;

export type ImageIconKey = keyof typeof IMAGE_ICON_DATA;
