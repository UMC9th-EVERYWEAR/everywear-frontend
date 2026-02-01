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

export interface CrawlResponseDTO {
  status?: string;
  estimated_time?: string;
  from_cache?: boolean;
  /** @format int32 */
  total_count?: number;
  reviews?: ReviewDTO[];
}

export interface ReviewDTO {
  /** @format int64 */
  review_id?: number;
  /** @format int32 */
  rating?: number;
  content?: string;
  review_date?: string;
  /** @format int32 */
  user_height?: number;
  /** @format int32 */
  user_weight?: number;
  option_text?: string;
  images?: string[];
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

export interface ApiResponseLikeToggleDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: LikeToggleDTO;
}

export interface LikeToggleDTO {
  is_liked?: boolean;
}

export interface ApiResponseMapStringObject {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: Record<string, any>;
}

export interface ApiResponseUserResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: UserResponse;
}

export interface UserResponse {
  /** @format int64 */
  userId?: number;
  name?: string;
  email?: string;
  socialType?: UserResponseSocialTypeEnum;
  isActive?: UserResponseIsActiveEnum;
  isAgreed?: boolean;
  alarmOnoff?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
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
  isLiked?: boolean;
  /** @format date-time */
  createdAt?: string;
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
  fittingResultImage?: string;
  isLiked?: boolean;
  productName?: string;
  productCategory?: string;
  /** @format date-time */
  createdAt?: string;
}

export enum UserResponseSocialTypeEnum {
  KAKAO = "KAKAO",
  GOOGLE = "GOOGLE",
  NAVER = "NAVER",
}

export enum UserResponseIsActiveEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}

export interface VerifyAndSavePayload {
  /** @format binary */
  image: File;
}
