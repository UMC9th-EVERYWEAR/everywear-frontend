// @ts-nocheck
export interface ApiResponseVoid {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: any;
}

export interface ApiResponseLong {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  /** @format int64 */
  result?: number;
}

/** 리뷰 크롤링 요청 */
export interface CrawlReviewDTO {
  /**
   * 상품 ID
   * @format int64
   * @example 123
   */
  product_id: number;
  /**
   * 상품 URL
   * @minLength 1
   * @example "https://www.musinsa.com/products/5432652"
   */
  product_url: string;
  /**
   * 쇼핑몰 이름
   * @minLength 1
   * @example "무신사"
   */
  shoppingmall_name: string;
}

/** 리뷰 크롤링 응답 DTO */
export interface CrawlResponseDTO {
  /**
   * 크롤링 상태
   * @example "processing"
   */
  status?: CrawlResponseDtoStatusEnum;
  /**
   * 예상 소요 시간
   * @example "30초"
   */
  estimated_time?: string;
  /**
   * 캐시 데이터 반환 여부
   * @example false
   */
  from_cache?: boolean;
  /**
   * 총 리뷰 개수
   * @format int32
   * @example 0
   */
  total_count?: number;
  /** 조회된 리뷰 목록 */
  reviews?: ReviewlDTO[];
}

export interface ApiResponseCrawlResponseDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: CrawlResponseDTO;
}

/** 리뷰 상세 정보 */
export interface ReviewDTO {
  /**
   * 리뷰 고유 ID
   * @format int64
   * @example 101
   */
  review_id?: number;
  /**
   * 평점 (1~5)
   * @format int32
   * @example 5
   */
  rating?: number;
  /**
   * 리뷰 내용
   * @example "사이즈가 딱 맞고 재질이 좋아요."
   */
  content?: string;
  /**
   * 리뷰 작성일
   * @example "2025.05.20 or 7일전"
   */
  review_date?: string;
  /**
   * 사용자 키 (cm)
   * @format int32
   * @example 175
   */
  user_height?: number;
  /**
   * 사용자 몸무게 (kg)
   * @format int32
   * @example 70
   */
  user_weight?: number;
  /**
   * 구매 옵션 정보
   * @example "Black / L"
   */
  option_text?: string;
  /** 리뷰 이미지 URL 리스트 */
  images?: string[];
}

export interface ApiResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: any;
}

export interface ApiResponseMapStringObject {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: Record<string, any>;
}

/** 상품 등록 요청 (무신사/지그재그/29cm/W컨셉 URL 자동 감지) */
export interface ImportDTO {
  /**
   * 상품 URL (무신사, 지그재그, 29cm, W컨셉 중 하나)
   * @minLength 1
   * @example "string"
   */
  product_url: string;
}

export interface ApiResponseImportDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  /** 상품 등록 요청 (무신사/지그재그/29cm/W컨셉 URL 자동 감지) */
  result?: ImportDTO;
}

export interface FittingRequest {
  /** @format int64 */
  productId?: number;
}

export interface ApiResponseFittingApplyResult {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: FittingApplyResult;
}

export interface FittingApplyResult {
  /** @format int64 */
  fittingId?: number;
  fittingResultImageUrl?: string;
}

export interface ApiResponseTokenRefreshResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: TokenRefreshResponse;
}

export interface TokenRefreshResponse {
  accessToken?: string;
}

export interface ApiResponseString {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: string;
}

export interface AlarmToggleResponse {
  alarmOn?: boolean;
  message?: string;
}

export interface ApiResponseAlarmToggleResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: AlarmToggleResponse;
}

export interface AgreeToggleResponse {
  isAgreed?: boolean;
  message?: string;
}

export interface ApiResponseAgreeToggleResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: AgreeToggleResponse;
}

export interface ApiResponseLikeToggleDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: LikeToggleDTO;
}

export interface LikeToggleDTO {
  is_liked?: boolean;
}

export interface ApiResponseUserResponseDto {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: UserResponseDto;
}

export interface UserResponseDto {
  /** @format int64 */
  userId?: number;
  name?: string;
  email?: string;
  socialType?: UserResponseDtoSocialTypeEnum;
  isActive?: UserResponseDtoIsActiveEnum;
  isAgreed?: boolean;
  alarmOn?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface UserImgQuery {
  /** @format int64 */
  profileImageId?: number;
  imageUrl?: string;
  representative?: boolean;
}

export interface ApiResponseRepresentativeImgResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: RepresentativeImgResponse;
}

export interface RepresentativeImgResponse {
  representative_img?: UserImgQuery;
}

/** 리뷰 목록 조회 응답 DTO */
export interface ReviewListDTO {
  /**
   * 크롤링 상태
   * @example "completed"
   */
  status?: string;
  /**
   * 총 리뷰 개수
   * @format int32
   * @example 15
   */
  total_count?: number;
  /** 리뷰 상세 목록 */
  reviews?: ReviewDTO[];
}

/** AI 리뷰 요약 및 키워드 DTO */
export interface AiReviewDTO {
  /**
   * AI 생성 리뷰 요약
   * @example "전체적으로 평점이 높으며 배송이 빠르다는 평이 많습니다."
   */
  summary?: string;
  /**
   * 추출된 키워드 (최대 4개)
   * @example ["가성비","빠른배송","재질만족","정사이즈"]
   */
  keywords?: string[];
  /**
   * 처리 메시지
   * @example "성공적으로 요약되었습니다."
   */
  message?: string;
}

export interface ApiResponseAiReviewDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  /** AI 리뷰 요약 및 키워드 DTO */
  result?: AiReviewDTO;
}

export interface ApiResponseReviewDto {
  isSuccess? : boolean;
  code? : string;
  message? : string;
  result? : ReviewListDTO;
}

export interface ApiResponseProductListResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ProductListResponse;
}

export interface ListDTO {
  /** @format int64 */
  product_id?: number;
  shoppingmale_name?: string;
  product_url?: string;
  category?: string;
  product_img_url?: string;
  product_name?: string;
  brand_name?: string;
  price?: string;
  /** @format float */
  star_point?: number;
  /** @format int64 */
  product_num?: number;
  is_liked?: boolean;
  ai_review?: string;
}

export interface ProductListResponse {
  products?: ListDTO[];
}

export interface ApiResponseProductDetailResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ProductDetailResponse;
}

export interface ProductDetailResponse {
  product?: ProductForFittingDTO;
}

export interface ProductForFittingDTO {
  brand_name?: string;
  category?: string;
  is_liked?: boolean;
  price?: string;
  /** @format int64 */
  product_id?: number;
  product_img_url?: string;
  product_name?: string;
  /** @format int64 */
  product_num?: number;
  product_url?: string;
  shoppingmale_name?: string;
  /** @format float */
  star_point?: number;
  ai_review?: string;
}

export interface ApiResponseListFittingSummary {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: FittingSummary[];
}

export interface FittingSummary {
  /** @format int64 */
  fittingId?: number;
  fittingResultImage?: string;
  /** @format date-time */
  createdAt?: string;
  product?: ProductBrief;
}

export interface ProductBrief {
  /** @format int64 */
  productId?: number;
  productName?: string;
  isLiked?: boolean;
}

export interface ApiResponseFittingDetail {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: FittingDetail;
}

export interface FittingDetail {
  /** @format int64 */
  fittingId?: number;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  /** @format date-time */
  createdAt?: string;
  product?: ProductSummary;
}

export interface ProductSummary {
  /** @format int64 */
  productId?: number;
  siteName?: string;
  productName?: string;
  price?: string;
  /** @format float */
  rating?: number;
  purchaseUrl?: string;
  isLiked?: boolean;
}

/**
 * 크롤링 상태
 * @example "processing"
 */
export enum CrawlResponseDtoStatusEnum {
  Processing = "processing",
  Completed = "completed",
  Failed = "failed",
}

export enum UserResponseDtoSocialTypeEnum {
  KAKAO = "KAKAO",
  GOOGLE = "GOOGLE",
  NAVER = "NAVER",
}

export enum UserResponseDtoIsActiveEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}

export interface VerifyAndSavePayload {
  /** @format binary */
  image: File;
}
