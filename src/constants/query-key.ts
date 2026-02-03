/**
 * [QUERY_KEYS]
 * React Query에서 사용할 쿼리 키들을 상수화합니다.
 * - 도메인별로 계층 구조를 가집니다.
 * - 동적 키(ID 등)가 필요한 경우 함수 형태로 정의합니다.
 */
export const QUERY_KEYS = {
	// 인증 및 유저 관련
	AUTH: {
		ALL: ['auth'] as const,
		USER: ['auth', 'user'] as const,
		SESSION: ['auth', 'session'] as const,
	},

	// 사용자 이미지 (프로필 사진)
	USER_IMAGES: {
		ALL: ['user-images'] as const,
		LIST: ['user-images', 'list'] as const,
		DETAIL: (imageId: number) =>
      ['user-images', 'detail', imageId] as const,
	},

	// 상품 관련 (무신사, 지그재그 등)
	PRODUCT: {
		ALL: ['product'] as const,
		LIST: ['product', 'list'] as const,
		CATEGORY: (category: string) => ['product', 'category', category] as const,
		LIKE: ['product', 'like'] as const,
	},

	// 리뷰 및 크롤링 관련
	REVIEW: {
		ALL: ['review'] as const,
		AI: (productId: number) => ['review', 'ai', productId] as const, //AI리뷰랑 최신리뷰 구분
		RECENT: (productId: number) => ['review', 'recent', productId] as const,
		STATUS: (productId: number) => ['review', 'status', productId] as const,
	},

	// 가상 피팅 관련
	FITTING: {
		ALL: ['fitting'] as const,
		SESSION: ['fitting', 'session'] as const, 
		RECENT: ['fitting', 'recent'] as const,
		DETAIL: (fittingId: number) => ['fitting', 'detail', fittingId] as const,
	},

	// 내 옷장 관련
	CLOSET: {
		ALL: ['closet'] as const,
		LIST: ['closet', 'list'] as const,
		CATEGORY: (category: string) => ['closet', 'category', category] as const,
	},
} as const;
