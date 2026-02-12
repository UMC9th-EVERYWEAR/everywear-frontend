import { createIcon } from './createIcon'

// header
import arrowSvg from '@/src/assets/icons/svgs/logo/arrow-icon.svg?react'
import settingSvg from '@/src/assets/icons/svgs/logo/setting-icon.svg?react'

// login
import GoogleSvg from '@/src/assets/icons/svgs/login/google-icon.svg?react'
import KakaoSvg from '@/src/assets/icons/svgs/login/kakao-icon.svg?react'
import CheckSvg from '@/src/assets/icons/svgs/login/check-box.svg?react'

// logo
import EverywearSvg from '@/src/assets/icons/svgs/logo/everywear.svg?react'
import MusinsaSvg from '@/src/assets/icons/svgs/logo/musinsa-logo.svg?react'
import CmLogoSvg from '@/src/assets/icons/svgs/logo/29cmLogo.svg?react'
import ZigzagSvg from '@/src/assets/icons/svgs/logo/zigzag-logo.svg?react'
import WSvg from '@/src/assets/icons/svgs/logo/w-logo.svg?react'
import LightSvg from '@/src/assets/icons/svgs/logo/light.svg?react'
import DarkSvg from '@/src/assets/icons/svgs/logo/dark.svg?react'


// onboarding
import GoodBoxSvg from '@/src/assets/icons/svgs/onboarding/good-box.svg?react'
import XBoxSvg from '@/src/assets/icons/svgs/onboarding/bad-box.svg?react'
import CameraSvg from '@/src/assets/icons/svgs/onboarding/camera-blue.svg?react'
import GallerySvg from '@/src/assets/icons/svgs/onboarding/gallery.svg?react'
import LoadingSvg from '@/src/assets/icons/svgs/onboarding/loading-one.svg?react'

// clothes
import AllSvg from '@/src/assets/icons/svgs/clothes/all-icon.svg?react'
import BottomSvg from '@/src/assets/icons/svgs/clothes/bottom-icon.svg?react'
import TopSvg from '@/src/assets/icons/svgs/clothes/top-icon.svg?react'
import OnePieceSvg from '@/src/assets/icons/svgs/clothes/onepiece-icon.svg?react'
import OuterSvg from '@/src/assets/icons/svgs/clothes/outer-icon.svg?react'
import EtcSvg from '@/src/assets/icons/svgs/clothes/etc-icon.svg?react'

// fitting
import StartSvg from '@/src/assets/icons/svgs/fitting/fitting-card-star.svg?react'


export const Icons = {
	// header 
	Arrow: createIcon(arrowSvg),
	SettingHeader: createIcon(settingSvg),
	
	// login
	Google: createIcon(GoogleSvg),
	Kakao: createIcon(KakaoSvg),
	CheckLogin: createIcon(CheckSvg),

	// logo
	Everywear: createIcon(EverywearSvg),
	Musinsa: createIcon(MusinsaSvg),
	Cm: createIcon(CmLogoSvg),
	Zigzag: createIcon(ZigzagSvg),
	WLogo: createIcon(WSvg),
	LightLogo: createIcon(LightSvg),
	DarkLogo: createIcon(DarkSvg),

	// onboarding
	GoodBox: createIcon(GoodBoxSvg),
	XBox: createIcon(XBoxSvg),
	Camera: createIcon(CameraSvg),
	Gallery: createIcon(GallerySvg),
	Loading: createIcon(LoadingSvg),

	// clothes
	All: createIcon(AllSvg),
	Bottom: createIcon(BottomSvg),
	Top: createIcon(TopSvg),
	OnePiece: createIcon(OnePieceSvg),
	Outer: createIcon(OuterSvg),
	Etc: createIcon(EtcSvg),

	// fitting
	Star: createIcon(StartSvg),

} as const
