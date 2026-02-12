import type { TermType } from '../components/login/TermsCheckBox';
import { TERMS_LINK } from './link';

export const TERMS_CONFIG: Record<TermType, { label: string; url: string }> = {
	SERVICE: { label: '서비스 이용약관 동의', url: TERMS_LINK.SERVICE_TERMS.url },
	PRIVACY: { label: '개인정보 수집 및 이용 동의', url: TERMS_LINK.PRIVACY.url },
	PHOTO: { label: '사진 정보 피팅 이용 동의', url: TERMS_LINK.PHOTO.url },
	PRODUCT: { label: '상품 정보 수집 및 분석 동의', url: TERMS_LINK.PRODUCT.url },
};
